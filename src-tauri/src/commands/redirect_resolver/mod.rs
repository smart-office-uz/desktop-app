extern crate open;

#[tauri::command]
pub fn redirect(url: String) -> () {
    // url might look like this -> https://smart-office.uz/blablabla
    // or like this -> pages/somepage, forms/someform, tables/sometable and etc.
    // so we need to check what kind of url we are getting
    // if we get a url that starts with https://smart-office.uz, then life is good we can just redirect the user
    // but if it doesn't, we need to append https://smart-office.uz ourselves
    if url.starts_with("https://smart-office.uz") {
        if open::that(url.clone()).is_err() {
            println!("Error when trying to open {:?}", url);
        }
    } else {
        let redirect_url = url.clone();
        if open::that(format!("https://smart-office.uz/{redirect_url}")).is_err() {
            println!("Error when trying to open {:?}", url);
        }
    }
}
