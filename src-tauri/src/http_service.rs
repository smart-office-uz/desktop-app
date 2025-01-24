use reqwest::Response;
use tauri::http::{HeaderMap, HeaderValue};

use std::fmt;

type Result<T> = std::result::Result<T, HttpError>;

// Define our error types. These may be customized for our error handling cases.
// Now we will be able to write our own errors, defer to an underlying error
// implementation, or do something in between.
#[derive(Clone)]
pub struct HttpError {
    pub status: u16,
    pub message: String,
}

impl fmt::Display for HttpError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.message)
    }
}

impl fmt::Debug for HttpError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{{ file: {}, line: {} }}", file!(), line!()) // programmer-facing output
    }
}

pub struct HttpService {}

pub struct GetRequestOptions {
    pub url: String,
    pub headers: Vec<(&'static str, String)>,
    pub bearer_token: Option<String>,
}

impl HttpService {
    pub async fn get<T>(options: GetRequestOptions) -> Result<T>
    where
        T: serde::de::DeserializeOwned,
    {
        let mut headers = HeaderMap::new();
        for (key, value) in options.headers.iter() {
            let header_value = HeaderValue::from_str(value).unwrap();
            headers.insert(key.to_owned(), header_value);
        }

        let reqwest_client = reqwest::Client::new();
        let request = reqwest_client.get(options.url);
        let response: Response;

        if let Some(token) = options.bearer_token {
            response = request
                .bearer_auth(token)
                .send()
                .await
                .map_err(|err| HttpError {
                    message: err.to_string(),
                    status: 500,
                })?;
        } else {
            response = request.send().await.map_err(|err| {
                println!("{:?}", err);
                HttpError {
                    message: err.to_string(),
                    status: 500,
                }
            })?;
        }

        match response.error_for_status() {
            Ok(response) => {
                let text = response.text().await.unwrap_or_default();
                println!("Response: {:?}", text);
                let json = serde_json::from_str(&text).map_err(|err| HttpError {
                    message: err.to_string(),
                    status: 500,
                });
                match json {
                    Ok(dto) => Ok(dto),
                    Err(err) => Err(err),
                }
            }
            Err(error) => {
                if let Some(error_status_code) = error.status() {
                    Err(HttpError {
                        status: error_status_code.as_u16(),
                        message: error.to_string(),
                    })
                } else {
                    Err(HttpError {
                        status: 500,
                        message: error.to_string(),
                    })
                }
            }
        }
    }
}
