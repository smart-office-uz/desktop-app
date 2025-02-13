extern crate open;
use tauri_plugin_store::StoreExt;

use std::sync::Mutex;

// local
mod commands;
mod device;
mod event;
mod gui;
mod http_error_handler;
mod http_service;
mod linux_gui;
mod macos_gui;
mod notification_platform;
mod repositories;
mod windows_gui;

use tauri::{
    menu::{Menu, MenuItem},
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent, TrayIconId},
    Manager, PhysicalPosition,
};
use tauri_plugin_sentry::sentry;

struct AppState {
    current_tray_id: Option<TrayIconId>,
}

impl Default for AppState {
    fn default() -> Self {
        Self {
            current_tray_id: None,
        }
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let sentry_client = sentry::init((
        "https://f8119f98d7fa95eca8e1202033239387@o4508652864864256.ingest.de.sentry.io/4508652868862032",
        sentry::ClientOptions {
            release: sentry::release_name!(),
            auto_session_tracking: true,
            ..Default::default()
        },
    ));

    tauri::Builder::default()
        .plugin(tauri_plugin_sentry::init_with_no_injection(&sentry_client))
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_websocket::init())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_os::init())
        .plugin(
            tauri_plugin_log::Builder::new()
                .target(tauri_plugin_log::Target::new(
                    tauri_plugin_log::TargetKind::Stdout,
                ))
                .build(),
        )
        .setup(|app| {
            // handling closing the app on autostart
            let args: Vec<String> = std::env::args().collect();

            if args.contains(&"--autostart".to_string()) {
                // Do not show the main window
                println!("App started in background (autostart)");
                let main_window = app.get_webview_window("main");
                if let Some(window) = main_window {
                    window.hide().unwrap_or_else(|err| {})
                }
            }

            // preloading the app store
            match app.store("store.json") {
                Ok(_) => {}
                Err(err) => {
                    println!("Error when loading the app store: {:?}", err);
                }
            }

            // at least 1 menu item is required
            let open = MenuItem::with_id(app, "open", "Ochish", true, None::<&str>)?;
            let quit = MenuItem::with_id(app, "quit", "Yopish", true, None::<&str>)?;

            let menu = Menu::with_items(app, &[&open, &quit])?;
            let tray = TrayIconBuilder::new()
                .icon(app.default_window_icon().unwrap().clone())
                .menu(&menu)
                .menu_on_left_click(true)
                .on_tray_icon_event(|tray, event| {
                    let tray_id = tray.id();
                    let tray_rect = tray.rect();
                    match event {
                        TrayIconEvent::Click {
                            button: MouseButton::Left,
                            button_state: MouseButtonState::Up,
                            id: tray_id,
                            rect: tray_rect,
                            position: PhysicalPosition { x: 1.0, y: 1.0 }, // id: tray.id(),
                        } => {
                            // in this example, let's show and focus the main window when the tray is clicked
                            let app = tray.app_handle();
                            if let Some(window) = app.get_webview_window("main") {
                                let _ = window.show();
                                let _ = window.set_focus();
                                window
                                    .request_user_attention(Some(
                                        tauri::UserAttentionType::Informational,
                                    ))
                                    .expect("Error when trying to request user's attention");
                            }
                        }
                        _ => {
                            println!("unhandled event {event:?}");
                        }
                    }
                })
                .on_menu_event(|app, event| match event.id.as_ref() {
                    "open" => {
                        if let Some(window) = app.get_webview_window("main") {
                            let _ = window.show();
                            let _ = window.set_focus();
                        }
                    }
                    "quit" => {
                        app.cleanup_before_exit();
                        app.exit(0);
                    }
                    _ => {}
                })
                .build(app)?;
            app.manage(Mutex::new(AppState::default()));

            let state = app.state::<Mutex<AppState>>();

            // Lock the mutex to get mutable access:
            let mut state = state.lock().unwrap();

            // modify the state
            state.current_tray_id = Some(tray.id().to_owned());

            #[cfg(desktop)]
            {
                use tauri_plugin_autostart::MacosLauncher;
                use tauri_plugin_autostart::ManagerExt;

                app.handle()
                    .plugin(tauri_plugin_autostart::init(
                        MacosLauncher::LaunchAgent,
                        Some(vec!["--autostart"]),
                    ))
                    .expect("Failed to initialize the autostart plugin!");
                // Get the autostart manager
                let autostart_manager = app.autolaunch();

                // Enable autostart
                let _ = autostart_manager.enable();
            }

            #[cfg(desktop)]
            {
                // catch window exit event
                // to run the app in the background
                let app_handle = app.app_handle().to_owned();
                let window = app_handle.get_webview_window("main").unwrap();
                window.on_window_event(move |event| match event {
                    tauri::WindowEvent::CloseRequested { api, .. } => {
                        api.prevent_close();
                        let main_window = app_handle.get_webview_window("main").unwrap();
                        main_window.hide().unwrap();
                    }

                    _ => {}
                });
            }
            Ok(())
        })
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            // notification
            commands::notification::notify,
            commands::notification::get_latest_notifications,
            commands::notification::get_latest_notifications_count,
            commands::notification::get_all_notifications,
            commands::notification::read_notification,
            // redirect
            commands::redirect_resolver::redirect,
            // tray
            commands::tray::update_tray_icon,
            // user
            commands::user::get_user_staff_id,
            // window
            commands::window::center_window,
            commands::window::change_window_size,
            // auth
            commands::auth::refresh_token,
            commands::auth::authenticate,
            commands::store::get_store_value,
            commands::store::set_store_value,
            commands::store::clear_store,
            commands::store::delete_store_value_by_key,
            // chat
            commands::chat::get_org_list,
            commands::chat::get_chat_messages,
            commands::chat::get_chats,
            commands::chat::get_staffs_by_organization_id,
            commands::chat::send_message,
            commands::chat::start_new,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
