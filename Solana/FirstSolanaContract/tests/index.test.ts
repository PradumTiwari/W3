 import {expect,test} from "bun:test";
 import { Connection, Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import {readFileSync} from "fs";
 let adminAccount=Keypair.generate();
 let dataAccount=Keypair.generate();
 
 test("Account is Initialized",async()=>{
    const connection=new Connection("http://127.0.0.1:8899","confirmed");
   
    const secretKey=JSON.parse(readFileSync("D:/Solana/id.json","utf-8"));
    const mintAuthority=Keypair.fromSecretKey(Uint8Array.from(secretKey));

    console.log("Admin Account",adminAccount.publicKey.toBase58());
    
  
   const transaction=new Transaction().add(
    SystemProgram.transfer({
        fromPubkey:mintAuthority.publicKey,
        toPubkey:adminAccount.publicKey,
        lamports:10*LAMPORTS_PER_SOL,
    })
   )

   const sig=await sendAndConfirmTransaction(connection,transaction,[mintAuthority]);
  
   const data=await connection.getBalance(adminAccount.publicKey);
   console.log("Balance is",data/LAMPORTS_PER_SOL);
   
 })