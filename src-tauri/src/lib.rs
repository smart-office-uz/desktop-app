extern crate open;

// windows
#[cfg(target_os = "windows")]
extern crate winrt_notification;
use std::sync::Mutex;

#[cfg(target_os = "windows")]
use tauri_winrt_notification::{Duration, Sound, Toast};

// local
mod auth;
mod event;
mod notification;
mod user;
use auth::auth::sign_in;
use user::user::*;

// macos
#[cfg(target_os = "macos")]
use mac_notification_sys;

use notify_rust::{Hint, Notification};
use tauri::{
    image::Image,
    menu::{Menu, MenuItem},
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent, TrayIconId},
    AppHandle, Manager, PhysicalPosition,
};

// #[derive(Default)]
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

#[tauri::command]
fn change_window_size(app: AppHandle, width: u16, height: u16) -> Result<(), String> {
    if let Some(main_window) = app.get_webview_window("main") {
        main_window
            .set_size(tauri::PhysicalSize { height, width })
            .expect("Failed to change window size!");
    };
    Ok(())
}

#[tauri::command]
fn center_window(app: AppHandle) -> Result<(), String> {
    if let Some(main_window) = app.get_webview_window("main") {
        main_window.center().expect("Failed to center window!");
    };
    Ok(())
}

#[tauri::command]
fn update_tray_icon(app: AppHandle, rgba: Vec<u8>, width: u32, height: u32) -> Result<(), String> {
    app.manage(Mutex::new(AppState::default()));

    let state = app.state::<Mutex<AppState>>();

    // Lock the mutex to get mutable access:
    let state = state.lock().unwrap();

    match state.current_tray_id.clone() {
        Some(id) => {
            let tray = app.tray_by_id(&id).unwrap();
            let icon = Image::new(&rgba, width, height);
            match tray.set_icon(Some(icon)) {
                Ok(_) => {
                    println!("Successfully updated the tray icon!");
                }
                Err(err) => {
                    println!("Couldn't update the tray icon: {:?}", err);
                }
            }

            let icon = Image::new(&rgba, width, height);
            match app
                .get_webview_window("main")
                .expect("Couldn't get the webview window with the name main!")
                .set_icon(icon)
            {
                Ok(_) => {
                    println!("Successfully updated the webview icon");
                }
                Err(err) => {
                    println!("Couldn't update the app icon: {:?}", err);
                }
            }
        }
        _ => {
            println!("No existing tray found!");
        }
    }
    Ok(())
}

#[tauri::command]
fn redirect(url: String) -> () {
    // url might look like this -> https://smart-office.uz/blablabla
    // or like this -> pages/somepage, forms/someform, tables/sometable and etc.
    // so we need to check what kind of url we are getting
    // if we get a url that starts with https://smart-office.uz, then life is good we can just redirect the user
    // but if it doesn't, we need to append https://smart-office.uz ourselves
    if url.starts_with("https://smart-office.uz") {
        if open::that(url).is_ok() {
            println!("Look at your browser !");
        }
    } else {
        if open::that(format!("https://smart-office.uz/{url}")).is_ok() {
            println!("Look at your browser !");
        }
    }
}

#[tauri::command]
async fn notify(message: &str, redirect: Option<String>) -> Result<(), String> {
    // linux
    #[cfg(target_os = "linux")]
    Notification::new()
        .body(message)
        .action("default", "default") // IDENTIFIER, LABEL
        .appname("Smart Office")
        .hint(Hint::Category("email".to_owned()))
        .timeout(0) // this however is
        .show_async()
        .await
        .unwrap()
        .wait_for_action(|action| match action {
            "default" => match redirect.clone() {
                Some(url) => {
                    println!("redirecting to... {url}");
                    if open::that(url).is_ok() {
                        println!("Look at your browser !");
                    }
                }
                None => {}
            },
            _ => (),
        });

    // windows
    #[cfg(target_os = "windows")]
    Toast::new(Toast::POWERSHELL_APP_ID)
        .title("Smart Office")
        .text1(message)
        .sound(Some(Sound::SMS))
        .duration(Duration::Short)
        .on_activated(move |_| {
            match redirect.clone() {
                Some(url) => {
                    println!("redirecting to... {url}");
                    if open::that(url).is_ok() {
                        println!("Look at your browser !");
                    };
                }
                _ => {}
            }

            Ok(())
        })
        .show()
        .expect("unable to toast");

    #[cfg(target_os = "macos")]
    let result = mac_notification_sys::Notification::new()
        .title("Smart Office")
        .subtitle(message)
        .send()
        .unwrap();

    #[cfg(target_os = "macos")]
    match result {
        mac_notification_sys::NotificationResponse::Click => {
            println!("Clicked on the notification itself");
            match redirect.clone() {
                Some(url) => {
                    if open::that(url).is_ok() {
                        println!("Look at your browser !");
                    };
                }
                _ => {}
            }
        }
        _ => {}
    }

    Ok(())
}

#[tauri::command]
async fn get_latest_notifications(app: AppHandle, token: &str) -> Result<String, String> {
    let response = notification::notification::get_latest(token, app).await;
    match response {
        Ok(response) => Ok(response),
        Err(error) => Err(error.to_string()),
    }
}
#[tauri::command]
async fn get_latest_notifications_count(token: &str) -> Result<String, String> {
    let response = notification::notification::get_count(token).await;
    match response {
        Ok(response) => Ok(response),
        Err(error) => {
            println!("error: {:?}", error);
            Err(error.to_string())
        }
    }
}

#[tauri::command]
async fn read_notification(token: &str, id: &str, index: u16) -> Result<(), String> {
    let response = notification::notification::read_notification(token, id, index).await;
    match response {
        Ok(_) => Ok(()),
        Err(error) => {
            println!("error: {:?}", error);
            Err(error.to_string())
        }
    }
}

#[tauri::command]
async fn authenticate(username: &str, password: &str) -> Result<String, String> {
    let response = sign_in(username.to_string(), password.to_string()).await;
    match response {
        Ok(response) => Ok(response),
        Err(err) => Err(err.to_string()),
    }
}

#[tauri::command]
async fn get_user_staff_id(token: &str) -> Result<String, String> {
    let response = get_staff_id(token).await;
    match response {
        Ok(response) => Ok(response),
        Err(err) => Err(err.to_string()),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
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
                            println!("left click pressed and released");
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
                // Disable autostart
                let _ = autostart_manager.disable();
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
                        println!("User tried to close the app, so we hide the app :)");
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
            authenticate,
            notify,
            get_latest_notifications,
            get_latest_notifications_count,
            redirect,
            update_tray_icon,
            read_notification,
            get_user_staff_id,
            change_window_size,
            center_window
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
