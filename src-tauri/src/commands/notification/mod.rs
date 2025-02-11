use tauri::AppHandle;
use tauri_plugin_store::StoreExt;

use crate::notification_platform::NotificationPlatform;
use crate::repositories::notification_repository;

#[tauri::command]
pub async fn notify(message: &str, redirect: Option<String>) -> Result<(), String> {
    let notification_platform = NotificationPlatform::new();
    notification_platform.show(message, redirect).await;
    Ok(())
}

#[tauri::command]
pub async fn get_latest_notifications(app: AppHandle, token: &str) -> Result<String, String> {
    let store = app.store("store.json").unwrap();
    let base_url = store.get("baseUrl").unwrap().as_str().unwrap().to_owned();
    let response = notification_repository::get_latest(token, app, base_url).await;

    match response {
        Ok(response) => Ok(response),
        Err(error) => Err(error.to_string()),
    }
}

#[tauri::command]
pub async fn get_latest_notifications_count(app: AppHandle, token: &str) -> Result<String, String> {
    let store = app.store("store.json").unwrap();
    let base_url = store.get("baseUrl").unwrap().as_str().unwrap().to_owned();

    let response = notification_repository::get_count(token.to_string(), app, base_url).await;
    match response {
        Ok(response) => Ok(response),
        Err(error) => Err(error.to_string()),
    }
}

#[tauri::command]
pub async fn get_all_notifications(
    app: AppHandle,
    token: &str,
    page: u8,
) -> Result<String, String> {
    let store = app.store("store.json").unwrap();
    let base_url = store.get("baseUrl").unwrap().as_str().unwrap().to_owned();

    let response = notification_repository::get_history(token, page, app, base_url).await;
    match response {
        Ok(response) => Ok(response),
        Err(error) => Err(error.to_string()),
    }
}

#[tauri::command]
pub async fn read_notification(
    app: AppHandle,
    token: &str,
    id: &str,
    index: u16,
) -> Result<(), String> {
    let store = app.store("store.json").unwrap();
    let base_url = store.get("baseUrl").unwrap().as_str().unwrap().to_owned();

    let response = notification_repository::read_notification(token, id, index, base_url).await;
    match response {
        Ok(_) => Ok(()),
        Err(error) => Err(error.to_string()),
    }
}
