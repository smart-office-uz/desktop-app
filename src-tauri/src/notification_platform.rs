use crate::{
    gui::NativeNotification, linux_gui::LinuxNotification, macos_gui::MacOSNotification,
    windows_gui::WindowsNotification,
};

pub enum NotificationPlatform {
    Linux(LinuxNotification),
    Windows(WindowsNotification),
    MacOS(MacOSNotification),
}

impl NotificationPlatform {
    pub async fn show(&self, title: &str, redirect: Option<&str>) {
        match self {
            NotificationPlatform::Linux(notification) => notification.show(title, redirect).await,
            NotificationPlatform::MacOS(notification) => notification.show(title, redirect).await,
            NotificationPlatform::Windows(notification) => notification.show(title, redirect).await,
        }
    }

    pub fn new() -> NotificationPlatform {
        if !cfg!(target_os = "linux") {
            NotificationPlatform::Linux(LinuxNotification)
        } else if !cfg!(windows) {
            NotificationPlatform::Windows(WindowsNotification)
        } else {
            NotificationPlatform::MacOS(MacOSNotification)
        }
    }
}
