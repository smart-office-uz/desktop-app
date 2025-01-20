use serde::{Deserialize, Serialize};

use crate::http_service::{GetRequestOptions, HttpError, HttpService};

#[derive(Serialize, Deserialize, Debug)]
struct GetStaffsByOrganizationIdDto {
    data: DataDto,
}

#[derive(Serialize, Deserialize, Debug)]
struct DataDto {
    limit: u16,
    total: u128,
    page: u32,
    staffs: Vec<ChatStaffDto>,
}

#[derive(Serialize, Deserialize, Debug)]
struct ChatStaffDto {
    id: String,
    org_id: u128,
    pinfl: u128,
    phone: Option<String>,
    name: String,
    short_name: String,
    label: String,
    department_name: String,
    position_name: String,
    org_name: String,
    avatar: Option<String>,
    status: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct GetStaffsByOrganizationIdRequestParams {
    organization_id: Option<String>,
    search: Option<String>,
    page: Option<u32>,
}

pub async fn get_by_organization_id(
    params: GetStaffsByOrganizationIdRequestParams,
    token: String,
    base_url: String,
) -> Result<String, HttpError> {
    let mut url = format!("{base_url}/services/platon-core/api/v2/chat/staffs?");
    if let Some(org_id) = params.organization_id {
        url.push_str(&format!("org_id={org_id}&"));
    }
    if let Some(page) = params.page {
        url.push_str(&format!("page={page}&"));
    }
    if let Some(search) = params.search {
        url.push_str(&format!("search={search}&"));
    }
    let response = HttpService::get::<GetStaffsByOrganizationIdDto>(GetRequestOptions {
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
        Err(error) => {
            println!("{}", error.to_string());
            Err(error)
        }
    }
}
