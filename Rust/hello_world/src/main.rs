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

// fn main(){
//     let mut chalo="Hello";
//     println!("Chalo {chalo}");
//     chalo="Bye";

//     let num=-1;


//     let tup:(i32,f64,u8)=(500,6.4,1);
//     let(x,y,z)=tup;
//     println!("x ,{x}");
//     let zeroes=[0;5];
//     let guess:u32="ab".parse().expect("Not a number");
//     println!("Guess {guess}",);
// }


//Function and Prameters

// fn main(){

//  say_hello("Pradum");
//  println!("{}",return2());

//  let y={
//     let x=3;
//      x+1;
//  };

// }


// fn say_hello(name:&str){
//     print!("Hello {name}");
// }


// fn return2()->i32{
//     return 2;
// }

//Loop

// fn main(){
//     let number=3;

//     if number<5{
//         println!("Condition was true");
//     }
//     else{
//         println!("Condition was false");
//     }

//     let conditon=true;
//     let num=if conditon {5} else {6};
    
//     println!("The value of the number is {}",num);


//    let mut zero=0;

//    let result=loop{
//     zero+=1;

//     if(zero==99){
//         break zero+1;
//     }
//    };
//    println!("The value of the result is {}",result);



//     let mut count=0;
//     'counting_up:loop{
//         println!("Ineer loop {count} ");
//         let mut remaining=10;

//         loop{
//             println!("Remainig is,{remaining}");

//             if remaining==9{
//                 break;
//             }
//             if count==2{
//                 break 'counting_up;
//             }
//             remaining-=1;

//         }
//         count+=1;
//     }

//     println!("End Count {}",{count});


// }



fn main(){
    let hello: &'static str="Hello World";//String literal
    let hello1=hello;
    println!("Hello 1 is {hello1}");

    let hello=String::from("Hello world");
 
    let hello1=hello;

     let a=[1,2,3,4,5];
  
     let slice=&a[1..3];
    assert_eq!(slice,&[2,3]);


}



