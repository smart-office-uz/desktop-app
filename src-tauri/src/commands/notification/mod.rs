use tauri::AppHandle;

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
    let response = notification_repository::get_latest(token, app).await;
    match response {
        Ok(response) => Ok(response),
        Err(error) => Err(error.to_string()),
    }
}

#[tauri::command]
pub async fn get_latest_notifications_count(app: AppHandle, token: &str) -> Result<String, String> {
    let response = notification_repository::get_count(token.to_string(), app).await;
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
    let response = notification_repository::get_history(token, page, app).await;
    match response {
        Ok(response) => Ok(response),
        Err(error) => Err(error.to_string()),
    }
}

#[tauri::command]
pub async fn read_notification(token: &str, id: &str, index: u16) -> Result<(), String> {
    let response = notification_repository::read_notification(token, id, index).await;
    match response {
        Ok(_) => Ok(()),
        Err(error) => Err(error.to_string()),
    }
}
