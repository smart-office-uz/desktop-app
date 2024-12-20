use tauri::{AppHandle, Manager, PhysicalSize};

#[tauri::command]
pub fn change_window_size(app: AppHandle, width: u16, height: u16) -> Result<(), String> {
    if let Some(main_window) = app.get_webview_window("main") {
        main_window
            .set_size(PhysicalSize { height, width })
            .expect("Failed to change window size!");
    };
    Ok(())
}

#[tauri::command]
pub fn center_window(app: AppHandle) -> Result<(), String> {
    if let Some(main_window) = app.get_webview_window("main") {
        main_window.center().expect("Failed to center window!");
    };
    Ok(())
}
