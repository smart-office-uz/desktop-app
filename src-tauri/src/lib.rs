extern crate open;

use std::sync::Mutex;

// local
mod commands;
mod device;
mod event;
mod gui;
mod linux_gui;
mod macos_gui;
mod notification_platform;
mod windows_gui;
mod repositories;
mod http_service;

use tauri::{
    menu::{Menu, MenuItem},
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent, TrayIconId},
    Manager, PhysicalPosition,
};

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
    tauri::Builder::default()
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
            // at least 1 menu item is required
            let quit_i = MenuItem::with_id(app, "open", "Open", true, None::<&str>)?;
            let menu = Menu::with_items(app, &[&quit_i])?;
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
                    _ => {
                        println!("menu item {:?} not handled", event.id);
                    }
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
                        Some(vec!["--flag1", "--flag2"]),
                    ))
                    .expect("Failed to initialize the autostart plugin!");

                // Get the autostart manager
                let autostart_manager = app.autolaunch();
                // Enable autostart
                let _ = autostart_manager.enable();
                // Check enable state
                println!(
                    "registered for autostart? {}",
                    autostart_manager.is_enabled().unwrap()
                );
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
            commands::notification::notify,
            commands::notification::get_latest_notifications,
            commands::notification::get_latest_notifications_count,
            commands::notification::get_all_notifications,
            commands::notification::read_notification,
            commands::redirect_resolver::redirect,
            commands::tray::update_tray_icon,
            commands::user::get_user_staff_id,
            commands::window::center_window,
            commands::window::change_window_size,
            commands::auth::refresh_token,
            commands::auth::authenticate,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
