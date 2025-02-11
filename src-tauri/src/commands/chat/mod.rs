use tauri_plugin_store::StoreExt;

use crate::repositories::{
    self,
    chat_repository::{GetChatMessagesParams, SendMessageParams, StartNewChatParams},
    chat_staff_repository::GetStaffsByOrganizationIdRequestParams,
};

#[tauri::command]
pub async fn get_org_list(app: tauri::AppHandle, token: String) -> Result<String, String> {
    let store = app.store("store.json").unwrap();
    let base_url = store.get("baseUrl").unwrap().as_str().unwrap().to_owned();

    let response = repositories::chat_organization_repository::get_list(token, base_url).await;
    match response {
        Ok(response) => Ok(response),
        Err(error) => Err(error.to_string()),
    }
}

#[tauri::command]
pub async fn get_staffs_by_organization_id(
    app: tauri::AppHandle,
    params: GetStaffsByOrganizationIdRequestParams,
    token: String,
) -> Result<String, String> {
    let store = app.store("store.json").unwrap();
    let base_url = store.get("baseUrl").unwrap().as_str().unwrap().to_owned();

    let response =
        repositories::chat_staff_repository::get_by_organization_id(params, token, base_url).await;

    match response {
        Ok(response) => Ok(response),
        Err(error) => Err(error.to_string()),
    }
}

#[tauri::command]
pub async fn get_chat_messages(
    app: tauri::AppHandle,
    params: GetChatMessagesParams,
    token: String,
) -> Result<String, String> {
    let store = app.store("store.json").unwrap();
    let base_url = store.get("baseUrl").unwrap().as_str().unwrap().to_owned();

    let response = repositories::chat_repository::get_chat_messages(params, token, base_url).await;

    match response {
        Ok(response) => Ok(response),
        Err(error) => Err(error.to_string()),
    }
}

#[tauri::command]
pub async fn get_chats(app: tauri::AppHandle, token: String) -> Result<String, String> {
    let store = app.store("store.json").unwrap();
    let base_url = store.get("baseUrl").unwrap().as_str().unwrap().to_owned();

    let response = repositories::chat_repository::get_chats(token, base_url).await;

    match response {
        Ok(response) => Ok(response),
        Err(error) => Err(error.to_string()),
    }
}

#[tauri::command]
pub async fn send_message(
    app: tauri::AppHandle,
    params: SendMessageParams,
    token: String,
) -> Result<String, String> {
    let store = app.store("store.json").unwrap();
    let base_url = store.get("baseUrl").unwrap().as_str().unwrap().to_owned();

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
    app: tauri::AppHandle,
    params: StartNewChatParams,
    token: String,
) -> Result<String, String> {
    let store = app.store("store.json").unwrap();
    let base_url = store.get("baseUrl").unwrap().as_str().unwrap().to_owned();

    let response = repositories::chat_repository::start_new(params, token, base_url).await;

    match response {
        Ok(response) => Ok(response),
        Err(error) => Err(error.to_string()),
    }
}
