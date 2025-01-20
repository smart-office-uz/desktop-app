use crate::repositories::{self, chat_staff_repository::GetStaffsByOrganizationIdRequestParams};

#[tauri::command]
pub async fn get_org_list(token: String, base_url: String) -> Result<String, String> {
    let response = repositories::chat_organization_repository::get_list(token, base_url).await;
    match response {
        Ok(response) => Ok(response),
        Err(error) => Err(error.to_string()),
    }
}

#[tauri::command]
pub async fn get_staffs_by_organization_id(
    params: GetStaffsByOrganizationIdRequestParams,
    token: String,
    base_url: String,
) -> Result<String, String> {
    let response =
        repositories::chat_staff_repository::get_by_organization_id(params, token, base_url).await;

    match response {
        Ok(response) => Ok(response),
        Err(error) => Err(error.to_string()),
    }
}
