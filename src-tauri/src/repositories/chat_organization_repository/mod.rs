use serde::{Deserialize, Serialize};

use crate::http_service::{GetRequestOptions, HttpError, HttpService};

#[derive(Serialize, Deserialize, Debug)]
struct GetChatOrgListDto {
    data: DataDto,
}

#[derive(Serialize, Deserialize, Debug)]
struct DataDto {
    limit: u16,
    total: u128,
    page: u32,
    orgs: Vec<ChatOrgDto>,
}

#[derive(Serialize, Deserialize, Debug)]
struct ChatOrgDto {
    id: u32,
    label: String,
    name: String,
}

pub async fn get_list(token: String, base_url: String) -> Result<String, HttpError> {
    let url = format!("{base_url}/services/platon-core/api/v2/chat/orgs",);
    let response = HttpService::get::<GetChatOrgListDto>(GetRequestOptions {
        bearer_token: Some(token.to_owned()),
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
