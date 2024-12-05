use crate::device::device;
use crate::repositories::auth_repository;

#[tauri::command]
pub async fn refresh_token(refresh_token: &str) -> Result<String, String> {
    struct RefreshTokenParams {
        refresh_token: String,
        device_id: String,
    }
    impl auth_repository::RefreshTokenCtx for RefreshTokenParams {
        fn get_device_id(&self) -> String {
            self.device_id.clone()
        }
        fn get_refresh_token(&self) -> String {
            self.refresh_token.clone()
        }
    }

    let device_id = device::get_device_id();
    let params = RefreshTokenParams {
        refresh_token: refresh_token.to_owned(),
        device_id,
    };
    let response = auth_repository::refresh_token(params)
        .await
        .unwrap_or_else(|err| err.to_string());
    Ok(response)
}

#[tauri::command]
pub async fn authenticate(username: &str, password: &str) -> Result<String, String> {
    let response = auth_repository::sign_in(username.to_string(), password.to_string()).await;
    match response {
        Ok(response) => Ok(response),
        Err(err) => Err(err.to_string()),
    }
}
