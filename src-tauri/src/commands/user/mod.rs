use crate::repositories::user_repository;
use tauri_plugin_store::StoreExt;

#[tauri::command]
pub async fn get_user_staff_id(app: tauri::AppHandle, token: &str) -> Result<String, String> {
    let store = app.get_store("store.json").unwrap();
    let base_url = store.get("baseUrl").unwrap().as_str().unwrap().to_owned();

    let response = user_repository::get_staff_id(token, base_url).await;
    match response {
        Ok(response) => Ok(response),
        Err(err) => Err(err.to_string()),
    }
}
