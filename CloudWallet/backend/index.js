
const express=require('express');

const app=express();

const {userModel}=require('./modal');
const { Keypair } = require('@solana/web3.js');

const jwt=require('jsonwebtoken');
const JWT_SECRET_KEY="123456";

app.use(express.json());


app.post('/api/v1/signup',async(req,res)=>{
    console.log("Username",req.body.username);
    
 const username=req.body.username;
 const password=req.body.password;

 const keyPair=Keypair.generate();

 const user=await userModel.create({
    username,
    password,
    publicKey:keyPair.publicKey.toString(),
    privateKey:keyPair.secretKey.toString(),
 })
   res.json({
        message: "Signup successful",
        publicKey: keyPair.publicKey.toString()
    });
})

app.post('/api/v1/signin',async(req,res)=>{
    if(!req.body.username||!req.body.password){
        console.log("No username or password found");
        return;
    }
    const username=req.body.username;
 const password=req.body.password;

  const user=await userModel.findOne({
    username:username,
    password:password,
  })

  if(user){
    const token= jwt.sign(
       { id:user._id,
       },
       JWT_SECRET_KEY
    )

     res.json({
      message:"Sigin Successful",
      token:token,
      publicKey:user.publicKey
     })

   
  }
  else{
    res.status(403).json({
        message:"Credentials are incorrect",
    })
  }
})


app.get('/api/v1/txn',(req,res)=>{
    
})


app.listen(3000,()=>{
    console.log("Server started at port 3000");
    
})