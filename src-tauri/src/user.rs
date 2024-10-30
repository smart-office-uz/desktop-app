pub mod user {
    pub async fn get_staff_id(token: &str) -> Result<String, Box<dyn std::error::Error>> {
        let client = reqwest::Client::new();
        let response = client
            .get("https://smart-office.uz/services/platon-core/user-info")
            .bearer_auth(token)
            .send()
            .await?;

        match response.error_for_status() {
            Ok(response) => Ok(response.text().await?),
            Err(error) => {
                println!(
                                "Error occured when checked the error_for_status() inside the get_staff_id function: {:?}",
                                error
                            );
                Err("Something went wrong!".into())
            }
        }
    }
}
