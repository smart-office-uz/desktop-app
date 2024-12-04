pub mod session {
    use std::error::Error;

    pub trait RefreshTokenCtx {
        fn get_refresh_token(&self) -> String;
        fn get_device_id(&self) -> String;
    }

    pub async fn refresh_token<Ctx>(ctx: Ctx) -> Result<String, Box<dyn Error>>
    where
        Ctx: RefreshTokenCtx + Send + Sync,
    {
        let client = reqwest::Client::new();
        let response = client
            .get("https://smart-office.uz/services/platon-auth/api/refresh/token")
            .bearer_auth(ctx.get_refresh_token())
            .header("device-id", ctx.get_device_id())
            .send()
            .await?;

        match response.error_for_status() {
            Ok(res) => Ok(res.text().await?),
            Err(_) => Err("Tokenni yangilashda xatolik yuz berdi!".into()),
        }
    }
}
