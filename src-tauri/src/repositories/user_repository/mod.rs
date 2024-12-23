pub async fn get_staff_id(
    token: &str,
    base_url: String,
) -> Result<String, Box<dyn std::error::Error>> {
    let client = reqwest::Client::new();
    let endpoint = format!("{base_url}/services/platon-core/user-info");
    let response = client.get(endpoint).bearer_auth(token).send().await?;

    match response.error_for_status() {
        Ok(response) => Ok(response.text().await?),
        Err(error) => Err("Something went wrong!".into()),
    }
}
