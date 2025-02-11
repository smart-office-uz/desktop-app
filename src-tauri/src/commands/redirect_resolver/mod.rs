extern crate open;
use tauri_plugin_store::StoreExt;

#[tauri::command]
pub fn redirect(app: tauri::AppHandle, url: String) -> () {
    let store = app.store("store.json").unwrap();
    let base_url = store.get("baseUrl").unwrap().as_str().unwrap().to_owned();
    // url might look like this -> https://smart-office.uz/blablabla
    // or like this -> pages/somepage, forms/someform, tables/sometable and etc.
    // so we need to check what kind of url we are getting
    // if we get a url that starts with https://smart-office.uz, then life is good we can just redirect the user
    // but if it doesn't, we need to append https://smart-office.uz ourselves
    if url.starts_with(&base_url) {
        if open::that(url.clone()).is_err() {
            println!("Error when trying to open {:?}", url);
        }
    } else {
        let redirect_url = url.clone();
        if open::that(format!("{base_url}/{redirect_url}")).is_err() {
            println!("Error when trying to open {:?}", url);
        }
    }
}
