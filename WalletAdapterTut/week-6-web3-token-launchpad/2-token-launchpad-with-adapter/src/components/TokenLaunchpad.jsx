import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {  TOKEN_PROGRAM_ID, createInitializeMint2Instruction, createMint, getMinimumBalanceForRentExemptMint } from "@solana/spl-token"

export function TokenLaunchpad() {
     const { connection } = useConnection();
    const wallet = useWallet();

    async function createToken() {
     
        const name=document.getElementById("name").value;
        const symbol=document.getElementById("symbol").value;
        const imageUrl=document.getElementById("imageUrl").value;
        const initialSupply=document.getElementById("initialSupply").value;

      

         const lamports = await getMinimumBalanceForRentExemptMint(connection);
         const keypair=Keypair.generate();

          const transaction = new Transaction().add(
                 SystemProgram.createAccount({
                     fromPubkey: wallet.publicKey,
                     newAccountPubkey: keypair.publicKey,
                     space: 82,
                     lamports,
                     programId:TOKEN_PROGRAM_ID,
                 }),//This only creates the account
                 createInitializeMint2Instruction(keypair.publicKey, 6, wallet.publicKey, wallet.publicKey, TOKEN_PROGRAM_ID),
                 //The above instruction actually shoves data into the account
                );
  
                const recentBlockhash=await connection.getLatestBlockhash();
                transaction.recentBlockhash=recentBlockhash.blockhash;
                transaction.feePayer=wallet.publicKey;
                transaction.partialSign(keypair);
                
          const sig=await wallet.sendTransaction(transaction,connection);
      console.log("Signature is ",sig);
      

    }
    return  <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }}>
        <h1>Solana Token Launchpad</h1>
        <input id="name" className='inputText' type='text' placeholder='Name'></input> <br />
        <input id="symbol" className='inputText' type='text' placeholder='Symbol'></input> <br />
        <input id="imageUrl" className='inputText' type='text' placeholder='Image URL'></input> <br />
        <input id="initialSupply" className='inputText' type='text' placeholder='Initial Supply'></input> <br />
        <button onClick={createToken} className='btn' >Create a token</button>
    </div>
}