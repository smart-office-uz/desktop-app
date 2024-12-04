use notify_rust::Notification;
extern crate open;

use crate::{event, gui};

pub struct LinuxNotification;

impl gui::NativeNotification for LinuxNotification {
    async fn show(&self, title: &str, description: &str) {
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
