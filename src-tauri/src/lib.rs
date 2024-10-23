extern crate open;
extern crate winrt_notification;
use tauri_winrt_notification::{Duration, Sound, Toast};
mod auth;
mod notification;
use auth::auth::sign_in;
use notify_rust::{Hint, Notification};
use tauri::{
    menu::{Menu, MenuItem},
    tray::TrayIconBuilder,
    AppHandle,
};

#[tauri::command]
fn notify(app_handle: AppHandle, message: &str, redirect: Option<String>) -> () {
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

    let redirect_clone = redirect.clone();
    #[cfg(target_os = "windows")]
    Toast::new(Toast::POWERSHELL_APP_ID)
        .title("Smart Office")
        .text1(message)
        .sound(Some(Sound::SMS))
        .duration(Duration::Short)
        .on_activated(move |_| {
            match redirect_clone.clone() {
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
async fn authenticate(username: &str, password: &str) -> Result<String, String> {
    let response = sign_in(username.to_string(), password.to_string()).await;
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
            TrayIconBuilder::new()
                .icon(app.default_window_icon().unwrap().clone())
                .menu(&menu)
                .menu_on_left_click(true)
                .build(app)?;

            Ok(())
        })
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            authenticate,
            notify,
            get_latest_notifications,
            get_latest_notifications_count
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
