import React, { useEffect, useState } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram ,LAMPORTS_PER_SOL, Transaction} from '@solana/web3.js';





const CreateToken = () => {

   const[pub,setPub]=useState('');


  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

    const [amount,setAmount]=useState(0);
   
    useEffect(() => {
  if (publicKey) {
    setPub(publicKey.toBase58());
  }
}, [publicKey]);

    const TransferSOLWallet=async()=>{
      console.log("iNSIDE THE FUNCTION");
      
   
      if(!publicKey){
        alert("Connect Wallet first");
      }
      //I have got the amount and i have got the public key so
      //i need to transfer amount*0.85x psol into it
      try {
        //here my recipent will be the wallet which i will be giving the sol to
        //i.e my account 2
        const recipent=new PublicKey("8e3ZA25L1Qh2i5JnqHQa3314uCvk6QuGRf9BXu5p1QQv");
        const lamports=parseFloat(amount)*LAMPORTS_PER_SOL;
        const transferIx=SystemProgram.transfer({
          fromPubkey:publicKey,
          toPubkey:recipent,
          lamports:lamports,
        })

        const tx=new Transaction().add(transferIx);
        const signature=await sendTransaction(tx,connection);
  console.log("Transaction Signature:", signature);
      } catch (error) {
          console.error("Transfer failed:", err);
      alert("Transfer failed: " + err.message);
      }
    
      
  
  }
  return (
    <div>
      <h1>Enter Your SOl</h1>  <input type="text" placeholder='amount' onChange={(e)=>{
        
        
        
        setAmount(Number(e.target.value))}} />
       {amount>0&& <h1>Equivalent  will be {amount*0.85} PSOL </h1>} 
        <button className='p-2 bg-amber-800 rounded-4xl shadow-2xl ' onClick={()=>{
        console.log("Button is Clicked");
        
       TransferSOLWallet();
       
        }}>Get Psol</button>
    


      {pub&&  <h1>Public Key is:- {pub}</h1>}
        
    </div>
  )
}

export default CreateToken