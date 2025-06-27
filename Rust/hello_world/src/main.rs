// use std::io;

// fn main() {
//     println!("Guess the number!");

//     println!("Please input your guess.");

//     let mut guess = String::new();

//     io::stdin()
//         .read_line(&mut guess)
//         .expect("Failed to read line");

//     println!("You guessed: {guess}");
// }


//Variables and mutablity

fn main(){
    let mut chalo="Hello";
    println!("Chalo {chalo}");
    chalo="Bye";

    let num=-1;


    let tup:(i32,f64,u8)=(500,6.4,1);
    let(x,y,z)=tup;
    println!("x ,{x}");
    let zeroes=[0;5];
    let guess:u32="ab".parse().expect("Not a number");
    println!("Guess {guess}",);
}


