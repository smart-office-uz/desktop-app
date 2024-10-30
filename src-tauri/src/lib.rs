extern crate open;

// windows
#[cfg(target_os = "windows")]
extern crate winrt_notification;
use std::sync::Mutex;

#[cfg(target_os = "windows")]
use tauri_winrt_notification::{Duration, Sound, Toast};

// local
mod auth;
mod env_vars;
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
    tray::{TrayIconBuilder, TrayIconId},
    AppHandle, Manager,
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
        }
        _ => {
            println!("No existing tray found!");
        }
    }
    Ok(())
}

#[tauri::command]
fn get_centrifuge_config() -> Result<String, String> {
    match env_vars::env_vars::load() {
        Ok(_) => match serde_json::to_string(&env_vars::env_vars::get_centrifuge_config()) {
            Ok(config) => Ok(config),
            Err(_) => Err("Failed to parse config".into()),
        },
        Err(_) => Err("Failed to load environment variables!".into()),
    }
}
#[tauri::command]
fn redirect(url: String) -> () {
    if open::that(url).is_ok() {
        println!("Look at your browser !");
    }
}
#[tauri::command]
fn notify(message: &str, redirect: Option<String>) -> () {
    // linux
    #[cfg(target_os = "linux")]
    Notification::new()
        .body(message)
        .action("default", "default") // IDENTIFIER, LABEL
        .appname("Smart Office")
        .hint(Hint::Category("email".to_owned()))
        .timeout(0) // this however is
        .show()
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
}

#[tauri::command]
async fn get_latest_notifications(token: &str) -> Result<String, String> {
    let response = notification::notification::get_latest(token).await;
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
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_websocket::init())
        .setup(|app| {
            // at least 1 menu item is required
            let quit_i = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;
            let menu = Menu::with_items(app, &[&quit_i])?;
            let tray = TrayIconBuilder::new()
                .icon(app.default_window_icon().unwrap().clone())
                .menu(&menu)
                .menu_on_left_click(true)
                .build(app)?;
            app.manage(Mutex::new(AppState::default()));

            let state = app.state::<Mutex<AppState>>();

            // Lock the mutex to get mutable access:
            let mut state = state.lock().unwrap();

            // modify the state
            state.current_tray_id = Some(tray.id().to_owned());
            Ok(())
        })
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            authenticate,
            notify,
            get_latest_notifications,
            get_latest_notifications_count,
            get_centrifuge_config,
            redirect,
            update_tray_icon,
            read_notification,
            get_user_staff_id
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
