use borsh::{BorshSerialize,BorshDeserialize};

#[derive(BorshSerialize,BorshDeserialize,Debug)]

struct Profile{
    bio:String,
    twitter:String,
}

#[derive(BorshSerialize,BorshDeserialize,Debug)]

struct User{
    name:String,
    age:u32,
    profile:Profile
}


fn main(){
    let user=User{
        name:"Pradum".to_string(),
        age:22,
        profile:{Profile { bio: "RustDev Learning Web3".to_string(), twitter: "@pradumTiwari".to_string() }},
    };

    //Serialize to Binary
    let encoded:Vec<u8>=user.try_to_vec().unwrap();
    println!("Borsh Encoded Bytes : {:?}",encoded);

    //Deserialize Back
    let decoded:User=User::try_from_slice(&encoded).unwrap();
    println!("Decoded User is {:?}",decoded);
   

}