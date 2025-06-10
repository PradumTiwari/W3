import React, { useEffect, useState } from 'react';
import {useConnection, useWallet} from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const App=()=>{
  const {publicKey,disconnect}=useWallet();
  const {connection}=useConnection();
  const [balance,setBalance]=useState(null);
   useEffect(()=>{
    const getBalance=async()=>{
      if(publicKey){
        const lamports=await connection.getBalance(publicKey);
        setBalance(lamports/1e9);
      }
    }

    getBalance();
  },[publicKey,connection])


  const reqAirdrop=async()=>{
  try {
    if(!publicKey)throw new Error("Connect Wallet First");
    const sig=await connection.requestAirdrop(publicKey,1e9);
    await connection.confirmTransaction(sig,'confirmed');

    alert("Airdrop Sucessful");
     const lamports = await connection.getBalance(publicKey);
      setBalance(lamports / 1e9);
    
  } catch (error) {
    console.error(error);
    alert("Airdrop Failed");
  }
}
  
 
  return(
      <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
       <h1>Simple Solana Dapps</h1>
       <WalletMultiButton/>
       {publicKey?(
           <div style={{ marginTop: '20px' }}>
                    <p><strong>Connected Wallet:</strong> {publicKey.toBase58()}</p>
                    <strong>Balance:{balance}</strong>
                    <button onClick={reqAirdrop} style={{marginTop:'10px'}}>
                      AirDrop 1 sol (devnet)
                    </button>
                    <button onClick={disconnect}>Disconnect</button>
                </div>
       ):(
         <p>No wallet connected</p>
       )}
        </div>
  )
}



export default App;
