pub mod event {
    use tauri::{AppHandle, Emitter};

    pub fn logout_user(app: AppHandle) {
        app.emit("logout_user", "").unwrap();
    }
}
