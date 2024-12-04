pub trait NativeNotification {
    fn show(&self, title: &str, description: &str);
}