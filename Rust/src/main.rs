use std::env;
use std::fs::{self,OpenOptions};
use std::io::Write;
use dotenv::dotenv;

fn main(){
    dotenv().ok();

    let file_path=env::var("FILE_PATH").expect("FILE_Path ");
    
  //Check if it exists
  if !std::path::Path::new(&file_path).exists(){
    println!("Creating new file as the file is not found");

    let mut file=OpenOptions::new().write(true).create(true).open(&file_path).expect("Failed to create a file");
    writeln!(file,"This is a new poem").expect("Failed to write to a poem")
  
  }

  //Now read the content safely
  let contens=fs::read_to_string(&file_path).expect("Should have been able to read");
  println!("With text :\n{}",contens);

}