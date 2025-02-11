use std::collections::HashMap;

use serde::{Deserialize, Serialize};

use crate::http_service::{GetRequestOptions, HttpError, HttpService};

#[derive(Serialize, Deserialize, Debug, Default)]
struct GetChatsDto {
    data: GetChatsDataDto,
}

#[derive(Serialize, Deserialize, Debug, Default)]
struct GetChatsDataDto {
    total: u128,
    profile: Profile,
    chats: Vec<Chat>,
    online: Vec<String>,
}

#[derive(Serialize, Deserialize, Debug, Default)]
struct Profile {
    name: String,
    phone: String,
    department_name: String,
    position_name: String,
    org_name: String,
    avatar: Option<String>,
}

#[derive(Serialize, Deserialize, Debug, Default)]
struct Chat {
    id: String,
    last_message: Option<String>,
    last_message_file_ext: Option<String>,
    last_sent_date: Option<String>,
    last_message_id: Option<String>,
    name: String,
    name_uz: String,
    name_la: String,
    avatar: Option<String>,
    created_at: String,
    #[serde(rename = "type")]
    chat_type: u8,
    owner_id: String,
    status: String,
    last_read_message_update_id: Option<u128>,
    unread_count: u32,
    receiver_id: Option<String>,
}

pub async fn get_chats(token: String, base_url: String) -> Result<String, HttpError> {
    let url = format!("{base_url}/services/platon-core/api/v2/chats");
    let response = HttpService::get::<GetChatsDto>(GetRequestOptions {
        bearer_token: Some(token),
        headers: vec![],
        url,
    })
    .await;

    match response {
        Ok(data) => {
            let json = serde_json::to_string(&data).map_err(|err| HttpError {
                message: err.to_string(),
                status: 500,
            })?;
            Ok(json)
        }
        Err(error) => Err(error),
    }
}

#[derive(Serialize, Deserialize, Debug)]
struct GetChatByIdDto {
    data: DataDto,
}

#[derive(Serialize, Deserialize, Debug)]
struct DataDto {
    total: u128,
    limit: u16,
    page: u16,
    messages: Vec<MessageDto>,
}

#[derive(Serialize, Deserialize, Debug)]
struct MessageDto {
    id: String,
    updated_at: Option<String>,
    text: String,
    created_at: String,
    read_at: Option<String>,
    sender_id: String,
    reply_message_id: Option<String>,
    sender_avatar: Option<String>,
    receiver_avatar: Option<String>,
    is_read: Option<bool>,
    is_pinned: bool,
    update_id: u128,
    forward: Option<String>,
    file: Option<File>,
    reply: Option<ReplyDto>,
}

#[derive(Serialize, Deserialize, Debug)]
struct File {
    id: String,
    name: String,
    path: String,
    size: u128,
    ext: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct ReplyDto {
    id: String,
    updated_at: Option<String>,
    text: String,
    created_at: String,
    read_at: Option<String>,
    sender_id: String,
    reply_message_id: Option<String>,
    sender_avatar: Option<String>,
    receiver_avatar: Option<String>,
    is_read: Option<bool>,
    is_pinned: bool,
    update_id: u128,
    forward: Option<String>,
    file: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct GetChatMessagesParams {
    pub chat_id: String,
    pub last_read_message_update_id: Option<u128>,
}

pub async fn get_chat_messages(
    params: GetChatMessagesParams,
    token: String,
    base_url: String,
) -> Result<String, HttpError> {
    let mut url = format!(
        "{base_url}/services/platon-core/api/v2/chat/messages/by/direction?chat_id={}&direction=UP",
        params.chat_id
    );

    if let Some(last_read_message_update_id) = params.last_read_message_update_id {
        url.push_str(
            format!("&last_read_message_update_id={last_read_message_update_id}").as_str(),
        );
    }

    let response = HttpService::get::<GetChatByIdDto>(GetRequestOptions {
        bearer_token: Some(token),
        headers: vec![],
        url,
    })
    .await;

    match response {
        Ok(data) => {
            let json = serde_json::to_string(&data).map_err(|err| HttpError {
                message: err.to_string(),
                status: 500,
            })?;
            Ok(json)
        }
        Err(error) => Err(error),
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SendMessageParams {
    pub room_id: String,
    pub room_type: RoomType,
    pub message: MessagePayload,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct MessagePayload {
    file_id: Option<String>,
    text: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum RoomType {
    Group,
    Private,
}

pub async fn send_message(
    params: SendMessageParams,
    token: String,
    base_url: String,
) -> Result<String, HttpError> {
    let mut url = format!("{base_url}/services/platon-core/api/v2/chat");
    let mut body = HashMap::new();

    match params.room_type {
        RoomType::Group => url.push_str("/group/message"),
        RoomType::Private => url.push_str("/message"),
    }

    body.insert("chat_id", params.room_id);

    if let Some(file_id) = params.message.file_id {
        body.insert("file_id", file_id);
    }

    if let Some(text_content) = params.message.text {
        body.insert("text", text_content);
    }

    let client = reqwest::Client::new();
    let mutation = client
        .post(url)
        .bearer_auth(token)
        .json(&body)
        .send()
        .await
        .map_err(|err| HttpError {
            message: err.to_string(),
            status: err.status().unwrap().as_u16(),
        });

    match mutation {
        Ok(response) => {
            let text = response.text().await.map_err(|err| HttpError {
                message: err.to_string(),
                status: err.status().unwrap().as_u16(),
            });
            match text {
                Ok(text) => Ok(text),
                Err(error) => Err(error.into()),
            }
        }
        Err(error) => Err(error.into()),
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct StartNewChatParams {
    receiver_id: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct StartNewChatParamsResponse {
    data: StartNewChatParamsResponseData,
}

#[derive(Serialize, Deserialize, Debug)]
struct StartNewChatParamsResponseData {
    id: String,
    name: String,
    name_uz: String,
    name_la: String,
    avatar: Option<String>,
    created_at: Option<String>,
    owner_id: String,
    unread_count: Option<u32>,
    receiver_id: Option<String>,
    #[serde(rename = "type")]
    chat_type: u8,
}

pub async fn start_new(
    params: StartNewChatParams,
    token: String,
    base_url: String,
) -> Result<String, HttpError> {
    let url = format!("{base_url}/services/platon-core/api/v2/chat");
    let client = reqwest::Client::new();

    let mut payload = HashMap::new();
    payload.insert("receiver_id", params.receiver_id);

    let mutation = client
        .post(url)
        .bearer_auth(token)
        .json(&payload)
        .send()
        .await
        .map_err(|err| HttpError {
            message: err.to_string(),
            status: err.status().unwrap().as_u16(),
        })?;

    let text = mutation.text().await.map_err(|err| HttpError {
        message: err.to_string(),
        status: 500,
    })?;
    println!("{text}");
    let json: StartNewChatParamsResponse =
        serde_json::from_str(&text).map_err(|err| HttpError {
            message: format!(
                "Error when deserializing request to json: {}",
                err.to_string()
            ),
            status: 500,
        })?;

    let out = serde_json::to_string(&json).map_err(|err| HttpError {
        message: format!(
            "Error when converting json into string: {}",
            err.to_string()
        ),
        status: 500,
    })?;
    Ok(out)
}
