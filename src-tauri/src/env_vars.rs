pub mod env_vars {
    use dotenvy::dotenv;
    use serde::{Deserialize, Serialize};

    #[derive(Serialize, Deserialize)]
    pub struct CentrifugeConfig {
        path: String,
        token: String,
    }
    pub fn get_centrifuge_config() -> CentrifugeConfig {
        CentrifugeConfig {
            token: std::env::var("CENTRIFUGE_TOKEN").expect("No centrifuge token found!"),
            path: std::env::var("CENTRIFUGE_PATH").expect("No centrifuge path found!"),
        }
    }

    pub fn load() -> Result<(), Box<dyn std::error::Error>> {
        dotenv()?;
        Ok(())
    }
}
