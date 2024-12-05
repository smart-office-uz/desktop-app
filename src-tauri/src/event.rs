pub mod event {
    use tauri::{AppHandle, Emitter};

    // pub fn logout_user(app: AppHandle) {
    //     app.emit("logout_user", "").unwrap();
    // }

    pub fn refresh_session(app: AppHandle) {
        app.emit("refresh_session", "").unwrap();
    }
}
