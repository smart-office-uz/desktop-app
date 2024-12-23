use crate::http_service::{GetRequestOptions, HttpError, HttpService};
use serde::{Deserialize, Serialize};
use std::{error::Error, str};

use crate::event;

#[derive(Serialize, Deserialize, Debug)]
struct GetCountResultDto {
    status: u16,
    data: GetCountResultDtoData,
}

#[derive(Serialize, Deserialize, Debug)]
struct GetCountResultDtoData {
    notify_count: GetCountResultDtoDataNotifyCount,
}

#[derive(Serialize, Deserialize, Debug)]
struct GetCountResultDtoDataNotifyCount {
    notify_count: u16,
}

pub async fn get_latest(token: &str, app: tauri::AppHandle) -> Result<String, Box<dyn Error>> {
    let client = reqwest::Client::new();

    let response = client
        .get("https://smart-office.uz/services/platon-core/api/v1/notification?type=2")
        .bearer_auth(token)
        .send()
        .await?;

    match response.error_for_status() {
        Ok(response) => Ok(response.text().await?),
        Err(error) => match error.status().expect("No status found!").as_u16() {
            401 => {
                event::event::refresh_session(app);
                Err("Access token is expired!".into())
            }
            _ => Err("Something went wrong!".into()),
        },
    }
}

#[derive(Serialize, Deserialize, Debug)]
struct GetHistoryDto {
    data: GetHistoryDataDto,
}

#[derive(Serialize, Deserialize, Debug)]
struct GetHistoryDataDto {
    results: Vec<GetHistoryDataNotificationDto>,
    total: u128,
}

#[derive(Serialize, Deserialize, Debug)]
struct GetHistoryDataNotificationDto {
    date: String,
    id: String,
    link: String,
    status: String,
    task_text: String,
    full_name: String,
    staff_id: String,
}

pub async fn get_history(
    token: &str,
    page: u8,
    app: tauri::AppHandle,
) -> Result<String, HttpError> {
    let url = format!("https://smart-office.uz/services/platon-core/web/v1/tables/history_notification/data?_page={}",page);
    let response = HttpService::get::<GetHistoryDto>(GetRequestOptions {
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
            if error.status == 401 {
                event::event::refresh_session(app);
                Err(HttpError {
                    message: "Unauthorized".to_owned(),
                    status: 401,
                })
            } else {
                Err(error)
            }
        }
    }
}

#[derive(Serialize, Deserialize, Debug)]
struct GetCountDto {
    status: u16,
    data: GetCountResultDtoData,
}

#[derive(Serialize, Deserialize, Debug)]
struct GetCountDtoData {
    notify_count: GetCountResultDtoDataNotifyCount,
}

#[derive(Serialize, Deserialize, Debug)]
struct GetCountDtoDataNotifyCount {
    notify_count: u16,
}

pub async fn get_count(token: String, app: tauri::AppHandle) -> Result<String, HttpError> {
    let response = HttpService::get::<GetCountDto>(GetRequestOptions {
        url: "https://smart-office.uz/services/platon-core/api/v1/notification?type=1".to_owned(),
        bearer_token: Some(token),
        headers: vec![],
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
            if error.status == 401 {
                event::event::refresh_session(app);
                Err(HttpError {
                    message: "Unauthorized".to_owned(),
                    status: 401,
                })
            } else {
                Err(error)
            }
        }
    }
}

pub async fn read_notification(token: &str, id: &str, index: u16) -> Result<(), Box<dyn Error>> {
    let client = reqwest::Client::new();
    let response = client
        .post("https://smart-office.uz/services/platon-core/api/v1/notification")
        .bearer_auth(token)
        .query(&[("notify_id", id), ("index", &index.to_string())])
        .send()
        .await?;
    match response.error_for_status() {
        Ok(_) => Ok(()),
        Err(error) => {
            println!("Error occured when checked the error_for_status() inside the read_notification function: {:?}",error);
            Err("Error when trying to send request to read the notification!".into())
        }
    }
}
