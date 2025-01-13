use crate::repositories;

#[tauri::command]
pub async fn get_org_list(token: String, base_url: String) -> Result<String, String> {
    let response = repositories::chat_organization_repository::get_list(token, base_url).await;
    match response {
        Ok(response) => Ok(response),
        Err(error) => Err(error.to_string()),
    }
}
