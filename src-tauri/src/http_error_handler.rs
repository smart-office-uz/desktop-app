// use std::error::Error;

// use crate::http_service::HttpError;

// pub trait HttpErrorHandler {
//     fn on_unathenticated_request(error: HttpError, callback: fn()) -> Result<(), HttpError>;
// }

// impl HttpErrorHandler for HttpError {
//     fn on_unathenticated_request(error: HttpError, callback: fn()) -> Result<(), HttpError> {
//         if error.status == 401 {
//             callback();
//             Err(error)
//         } else {
//             Err(error)
//         }
//     }
// }
