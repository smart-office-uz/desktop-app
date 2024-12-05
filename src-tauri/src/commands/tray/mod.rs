extern crate open;

use std::sync::Mutex;
use tauri::{image::Image, AppHandle, Manager};

use crate::AppState;

#[tauri::command]
pub fn update_tray_icon(
    app: AppHandle,
    rgba: Vec<u8>,
    width: u32,
    height: u32,
) -> Result<(), String> {
    app.manage(Mutex::new(AppState::default()));

    let state = app.state::<Mutex<AppState>>();

    // Lock the mutex to get mutable access:
    let state = state.lock().unwrap();

    match state.current_tray_id.clone() {
        Some(id) => {
            let tray = app.tray_by_id(&id).unwrap();
            let icon = Image::new(&rgba, width, height);
            match tray.set_icon(Some(icon)) {
                Ok(_) => {}
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
                Ok(_) => {}
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
