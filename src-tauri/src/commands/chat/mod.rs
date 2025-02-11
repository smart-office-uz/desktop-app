use crate::repositories::{
    self,
    chat_repository::{GetChatMessagesParams, SendMessageParams, StartNewChatParams},
    chat_staff_repository::GetStaffsByOrganizationIdRequestParams,
};

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

#[tauri::command]
pub async fn get_chat_messages(
    params: GetChatMessagesParams,
    token: String,
    base_url: String,
) -> Result<String, String> {
    let response = repositories::chat_repository::get_chat_messages(params, token, base_url).await;

    match response {
        Ok(response) => Ok(response),
        Err(error) => Err(error.to_string()),
    }
}

#[tauri::command]
pub async fn get_chats(token: String, base_url: String) -> Result<String, String> {
    let response = repositories::chat_repository::get_chats(token, base_url).await;

    match response {
        Ok(response) => Ok(response),
        Err(error) => Err(error.to_string()),
    }
}

#[tauri::command]
pub async fn send_message(
    params: SendMessageParams,
    token: String,
    base_url: String,
) -> Result<String, String> {
    let response = repositories::chat_repository::send_message(
        SendMessageParams {
            room_id: params.room_id,
            room_type: params.room_type,
            message: params.message,
        },
        token,
        base_url,
    )
    .await;

    match response {
        Ok(response) => Ok(response),
        Err(error) => Err(error.to_string()),
    }
}

#[tauri::command]
pub async fn start_new(
    params: StartNewChatParams,
    token: String,
    base_url: String,
) -> Result<String, String> {
    let response = repositories::chat_repository::start_new(params, token, base_url).await;

    match response {
        Ok(response) => Ok(response),
        Err(error) => Err(error.to_string()),
    }
}
