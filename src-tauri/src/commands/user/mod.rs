use crate::repositories::user_repository;

#[tauri::command]
pub async fn get_user_staff_id(token: &str, base_url: &str) -> Result<String, String> {
    let response = user_repository::get_staff_id(token, base_url.to_owned()).await;
    match response {
        Ok(response) => Ok(response),
        Err(err) => Err(err.to_string()),
    }
}
