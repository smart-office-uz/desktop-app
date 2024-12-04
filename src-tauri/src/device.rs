struct Device;

impl Device {
    fn get_device_id() -> String {
        String::from("Iphone X")
    }

    fn new() -> Device {
        Device {}
    }
}

pub mod device {
    use std::error::Error;

    use serde::{Deserialize, Serialize};
    use tauri::http::{HeaderMap, HeaderValue};

    use super::Device;

    pub fn get_device_id() -> String {
        Device::get_device_id()
    }
}
