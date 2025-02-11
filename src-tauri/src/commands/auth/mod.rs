use tauri_plugin_store::StoreExt;

use crate::device::device;
use crate::repositories::auth_repository;

struct RefreshTokenParams {
    refresh_token: String,
    device_id: String,
    base_url: String,
}

#[tauri::command]
pub async fn refresh_token(
    app_handle: tauri::AppHandle,
    refresh_token: &str,
) -> Result<String, String> {
    impl auth_repository::RefreshTokenCtx for RefreshTokenParams {
        fn get_device_id(&self) -> String {
            self.device_id.clone()
        }
        fn get_refresh_token(&self) -> String {
            self.refresh_token.clone()
        }
        fn get_base_url(&self) -> String {
            self.base_url.clone()
        }
    }

    let device_id = device::get_device_id();
    let params = RefreshTokenParams {
        refresh_token: refresh_token.to_owned(),
        device_id,
        base_url: app_handle
            .get_store("store.json")
            .unwrap()
            .get("baseUrl")
            .unwrap()
            .as_str()
            .unwrap()
            .to_owned(),
    };
    let response = auth_repository::refresh_token(params)
        .await
        .unwrap_or_else(|err| err.to_string());
    Ok(response)
}

#[tauri::command]
pub async fn authenticate(
    app_handle: tauri::AppHandle,
    username: &str,
    password: &str,
) -> Result<String, String> {
    let store = app_handle.get_store("store.json").unwrap();
    let response = auth_repository::sign_in(
        username.to_string(),
        password.to_string(),
        store.get("baseUrl").unwrap().as_str().unwrap().to_owned(),
    )
    .await;
    match response {
        Ok(response) => Ok(response),
        Err(err) => Err(err.to_string()),
    }
}
