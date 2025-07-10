// // // fn main() {
// // //     println!("Hello, world!");
// // //     print!("{}",sum(2,3));
// // // }



// // // fn sum(a:u32,b:u32)->u32{
// // //     return a+b;
// // // }


// // // //


// // //Better use a tuple

// // // fn main(){
// // //     let p=(30,40);

// // //     print!("Are of the rectangle is {}",area(p));
// // // }

// // // fn area(dimensions:(u32,u32))->u32{
// // //     return dimensions.0*dimensions.1;
// // // }


// // //use a struct

// // // struct Rectangle{
// // //     width:u32,
// // //     height:u32,
// // // }

// // // fn main(){
// // //     let rect1=Rectangle{
// // //         width:30,
// // //         height:40,
// // //     };

// // //     println!("Are os the rectange is {}",area(&rect1));
// // // }

// // // fn area(rectangle: &Rectangle) -> u32 {
// // //     rectangle.width * rectangle.height
// // // }


// // // #[derive(Debug)]
// // // struct Rectangle{
// // //     width:u32,
// // //     height:u32,
// // // }

// // // impl Rectangle{
// // //     fn area(&self) -> u32{
// // //         self.width*self.height
// // //     }

// // // }
// // // impl Rectangle {
// // //     fn area(&self) -> u32 {
// // //         self.width * self.height
// // //     }
// // // }

// // // fn main(){
// // //     let rect1=Rectangle{
// // //         width:30,
// // //         height:50,
// // //     };

// // //      println!("rect1 is {:?}", rect1);
// // //     println!(
// // //         "The area of the rectangle is {} square pixels.",
// // //         rect1.area() // Call method on rect1
// // //     );
// // // }



// // // fn main(){
// // //     let mut str=String::from("Pradum");
// // //     let ref1=&mut str;//we have one mutable reference 
// // //     let ref2=&str;
// // //     println!("{} {}",ref1,ref2);
// // // }


// // // fn main(){
// // //     let mut str=String::from("Pradum");
// // //     let ref1=&mut str;
// // //     ref1.push_str("T");
// // //     let ref2=&str;
// // //     println!("{}",str);
// // // }


// // // struct Rect{
// // //     width:u32,
// // //     height:u32,
// // // }

// // // impl Rect{
// // //     fn print_str(){
// // //         println!("Hello there");
// // //     }
// // // }


// // // fn main(){
// // //     Rect::print_str();
// // // }


// // //-----------------ENUMS-----------------

// // // enum Directions{
// // //     North,
// // //     South,
// // //     East,
// // //     West,
// // // }

// // // fn main(){
// // //     let go=Directions::East;

// // //     match go{
// // //         Directions::East=>println!("You are heading east"),
// // //         Directions::West=>println!("You are heading West"),
// // //         Directions::North=>println!("You are heading North"),
// // //         Directions::South=>println!("You are heading South"),
// // //     }
// // // }

// // enum message{
// //     Quit,
// //     Move{x:i32,y:i32},
// //     Write(String),
// //     ChangeColor(u8,u8,u8),
// // }


// // // fn main(){
// // //     let msg=message::Move { x: 10, y: 30 };

// // //     match msg{
// // //         message::Quit=>println!("Message Quit"),
// // //         message::Move{x,y}=>println!("Message Move"),
// // //         message::Write(text)=>println!("Message Quit"),
// // //         message::Quit=>println!("Message Quit"),
// // //     }
// // // }

// // // enum Message {
// // //     Quit,
// // //     Move { x: i32, y: i32 },
// // //     Write(String),
// // //     ChangeColor(i32, i32, i32),
// // // }

// // // impl Message{
// // //     fn call(&self){
// // //         //Method
// // //         println!("Hello Pradum");
// // //     }
// // // }

// // // fn main(){
// // //     let m=Message::Write(String::from("hello"));

// // // m.call();
// // // }




// // //Enum Option


// // // fn main(){
// // //     let number=Some(1000);
// // //     match number{
// // //         Some(n)=>println!("The value is {}",n),
// // //         None=>println!("No value found"),
// // //     }
// // // }



// // //ERROR handling

// // // enum Result<T,E>{
// // //     Ok(T),
// // //     Err(E),
// // // }

// // // use std::fs::File;

// // // fn main(){
// // //     let result=File::open("Hello.txt").unwrap();

   


// // // }



// // // fn divide(a:i32,b:i32)->Result<i32,String>{
// // //     if b==0{
// // //         Err(String::from("Division by zero!"))
// // //     }
// // //     else{
// // //         Ok(a/b)
// // //     }
// // // }

// // // fn main() {
// // //     let result = divide(10, 0);

// // //     match result {
// // //         Ok(answer) => println!("Result is {}", answer),
// // //         Err(e) => println!("Error: {}", e),
// // //     }
// // // }


// // enum Shape{
// //    Square(f32),
// //    Circle(f32),
// //    Reactangle(f32,f32),
// // }

// // fn main(){
// //     let shape=Shape::Circle((20.1));

// // }

// // fn area(s:Shape)->f32{
// //  return 3.14*s*s;
// // }


// fn main(){
//  let sumans=sum("s",3);
//  print!("Hello {}",suma.ns)
// }

// fn sum<T:std::ops::Add<Output=T>>(a:T,b:T)->T{
//     return a+b;
// }

// fn largest<T:std::cmp::PartialOrd>(list:&[T])->&T{
//     let mut largest=&list[0];
//     for item in list {
//         if item>largest{
//             largest=item;
//         }
//     }

//     largest
// }



// fn main() {
//     let number_list = vec![34, 50, 25, 100, 65];

//     let result = largest(&number_list);
//     println!("The largest number is {result}");

//     let char_list = vec!['y', 'm', 'a', 'q'];

//     let result = largest(&char_list);
//     println!("The largest char is {result}");
// }
// use std::ops::Add;

// fn main(){
   
//   print!("{}",sum(2,5))
// }
// fn sum<T: Add<Output = T>>(a: T, b: T) -> T {
//     a + b
// }

// fn print<T: std::fmt::Debug>(x: T) {
//     println!("{}", x);
// }


//Implementing own traits and generics

// trait speak{
//     fn speak(&self);
// }
// //this says any type that implements speak must have a speak() method


// struct Dog;

// impl speak for Dog{
//     fn speak(&self){
//         println!("Woooo Auhhh");
//     }
// }

// struct parrot;
// impl speak for parrot{
//     fn speak(&self){
//         println!("Squakk");
//     }
// }

// fn make_speak<T:speak>(animal:T){
//     animal.speak();
// }

// fn main(){
   
//     make_speak(parrot);
// }