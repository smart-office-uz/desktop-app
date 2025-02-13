use tauri_plugin_store::StoreExt;

#[tauri::command]
pub async fn get_store_value(app_handle: tauri::AppHandle, key: String) -> Result<String, String> {
    let store = app_handle
        .store("store.json")
        .map_err(|error| error.to_string())?;

    if let Some(value) = store.get(key.clone()) {
        let value = value.as_str().unwrap().to_owned();
        Ok(value)
    } else {
        Err(format!(
            "Failed to find a value for the key: {}",
            key.clone()
        ))
    }
}

#[tauri::command]
pub async fn set_store_value(
    app_handle: tauri::AppHandle,
    key: String,
    value: String,
) -> Result<(), String> {
    if let Ok(store) = app_handle.store("store.json") {
        store.set(key, value);
        Ok(())
    } else {
        Err("Failed to load the app store!".to_owned())
    }
}

#[tauri::command]
pub async fn clear_store(app_handle: tauri::AppHandle) -> Result<(), String> {
    if let Ok(store) = app_handle.store("store.json") {
        store.clear();
        Ok(())
    } else {
        Err("Failed to load the app store!".to_owned())
    }
}

#[tauri::command]
pub async fn delete_store_value_by_key(
    app_handle: tauri::AppHandle,
    key: String,
) -> Result<(), String> {
    if let Ok(store) = app_handle.store("store.json") {
        let removed = store.delete(key.clone());
        if removed == false {
            Err(format!("Failed to remove store value by the key: {}", key).to_owned())
        } else {
            Ok(())
        }
    } else {
        Err("Failed to load the app store!".to_owned())
    }
}
