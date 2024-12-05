struct Device;

impl Device {
    fn get_device_id() -> String {
        String::from("Iphone X")
    }
}

pub mod device {
    use super::Device;

    pub fn get_device_id() -> String {
        Device::get_device_id()
    }
}
