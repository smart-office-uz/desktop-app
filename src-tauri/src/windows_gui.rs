use crate::gui::NativeNotification;
extern crate open;

#[cfg(target_os = "windows")]
use tauri_winrt_notification::{Duration, Sound, Toast};

pub struct WindowsNotification;

impl NativeNotification for WindowsNotification {
    async fn show(&self, title: &str, redirect: Option<String>) {
        #[cfg(target_os = "windows")]
        Toast::new(Toast::POWERSHELL_APP_ID)
            .title("Smart Office")
            .text1(title)
            .sound(Some(Sound::SMS))
            .duration(Duration::Long)
            .on_activated(move |_| {
                match redirect.clone() {
                    Some(url) => {
                        if open::that(url).is_err() {
                            println!("Error occured when opening a url in windows!");
                        };
                    }
                    _ => {}
                }

                Ok(())
            })
            .show()
            .expect("unable to toast");
    }
}
