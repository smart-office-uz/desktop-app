use crate::gui::NativeNotification;
extern crate open;

#[cfg(target_os = "macos")]
use mac_notification_sys;

pub struct MacOSNotification;

impl NativeNotification for MacOSNotification {
    fn show(&self, title: &str, description: &str) {
        #[cfg(target_os = "macos")]
        let result = mac_notification_sys::Notification::new()
            .title("Smart Office")
            .subtitle(title)
            .send()
            .unwrap();

        #[cfg(target_os = "macos")]
        match result {
            mac_notification_sys::NotificationResponse::Click => match redirect.clone() {
                Some(url) => {
                    if open::that(url).is_err() {
                        println!("Error occured when opening a url in windows!");
                    };
                }
                _ => {}
            },
            _ => {}
        }
    }
}
