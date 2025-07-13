use serde::{Serialize,Deserialize};

#[derive(Serialize, Deserialize, Debug)]
struct Profile {
    bio: String,
    twitter: String,
}

// #[derive(Serialize, Deserialize, Debug)]
struct User {
    name: String,
    age: u32,
    profile: Profile,
}


use serde_json;

fn main(){
    let user = User {
        name: "Pradum".to_string(),
        age: 22,
        profile: Profile {
            bio: "Rust dev learning Web3".to_string(),
            twitter: "@pradumtiwari".to_string(),
        },
    };

    let json=serde_json::to_string(&user).unwrap();
    println!("Serialize Json:{}",json);

}