use notify_rust::{Hint, Notification};
use crate::gui;

extern crate open;


pub struct LinuxNotification;

impl gui::NativeNotification for LinuxNotification {
    async fn show(&self, title: &str, redirect: Option<&str>) {
        Notification::new()
            .subtitle(title)
            .action("default", "default") // IDENTIFIER, LABEL
            .appname("Smart Office")
            .hint(Hint::Category("email".to_owned()))
            .timeout(0) // this however is
            .show_async()
            .await
            .unwrap()
            .wait_for_action(|action| match action {
                "default" => match redirect.clone() {
                    Some(url) => match open::that(url) {
                        Ok(_) => {}
                        Err(err) => {
                            println!("Failed to open notification link on linux: {:?}", err);
                        }
                    },
                    None => {}
                },
                _ => (),
            });
    }
}
