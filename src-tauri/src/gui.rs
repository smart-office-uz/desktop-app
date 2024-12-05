use std::future::Future;

pub trait NativeNotification {
    fn show(&self, title: &str, redirect: Option<String>) -> impl Future<Output = ()>;
}
