import React, { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  createAssociatedTokenAccount,
  createAssociatedTokenAccountInstruction,
  createInitializeMintInstruction,
  createMintToInstruction,
  getAssociatedTokenAddress,
  getMinimumBalanceForRentExemptMint,
  getOrCreateAssociatedTokenAccount,
  MINT_SIZE,
  TOKEN_PROGRAM_ID
} from '@solana/spl-token';
import {
  Keypair,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import GetToken from './GetToken';

const CreateToken = () => {
  const [showGet,setShowGet]=useState(false);
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [token,setToken]=useState('');
  const [ata,setAta]=useState('');

      // ✅ Step 1: Generate new mint keypair
    const mintKeyPair = Keypair.generate();

    
      // ✅ Step 3: Create transaction
      const transaction = new Transaction();

  const handleCreateToken = async () => {
    if (!publicKey || !sendTransaction) {
      alert("Please connect your wallet first");
      return;
    }
    

    try {
        // ✅ Step 2: Get minimum rent-exempt lamports for mint account
      const lamports = await getMinimumBalanceForRentExemptMint(connection);


      // ✅ Step 4: Add instructions to create and initialize mint
      transaction.add(
        SystemProgram.createAccount({
          fromPubkey: publicKey,
          newAccountPubkey: mintKeyPair.publicKey,
          space: MINT_SIZE,
          lamports,
          programId: TOKEN_PROGRAM_ID,
        }),

        //This is used to tell solana that this account which we have given the minkeyPair address is a token mint
        //Token mint is nothing just a account on solana which repersent a token like usdc 
        createInitializeMintInstruction(
          mintKeyPair.publicKey, // mint
          9,                     // decimals
          publicKey,             // mint authority
          null                   // freeze authority
        )
      );

      // ✅ Step 5: Set fee payer and blockhash
      transaction.feePayer = publicKey;
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;

      // ✅ Step 6: Send the transaction using wallet + mint signer
      const txid = await sendTransaction(transaction, connection, {
        signers: [mintKeyPair], // 🧠 wallet signs + this keypair signs
      });

      // ✅ Step 7: Confirm the transaction
      await connection.confirmTransaction(
        { signature: txid, blockhash, lastValidBlockHeight },
        'confirmed'
      );

    const token=mintKeyPair.publicKey.toBase58();
   setToken(token);
      console.log("✅ Mint created at:", mintKeyPair.publicKey.toBase58());
       
       //Now time to create an Account that will hold the balance of the new token

       const associatedTokenAccount=await getAssociatedTokenAddress(
        mintKeyPair.publicKey,
        publicKey
       )

       console.log("Assoicated",associatedTokenAccount);
       

       const accountInfo=await connection.getAccountInfo(associatedTokenAccount);

       if(!accountInfo){
        const ataIx=createAssociatedTokenAccountInstruction(
          publicKey,
          associatedTokenAccount,
          publicKey,
          mintKeyPair.publicKey,

        )
         const ataTx = new Transaction().add(ataIx);
        const ataTxid = await sendTransaction(ataTx, connection);
        await connection.confirmTransaction(ataTxid, 'confirmed');

          console.log("Assoicated Token Account created ",associatedTokenAccount.toBase58());
           setAta(associatedTokenAccount.toBase58());
       }
         console.log("✅ Token Account address:", associatedTokenAccount.toBase58());

    } catch (error) {
      console.error("❌ Error creating mint:", error);
      alert(`❌ Error:\n${error.message}`);
    }
  };


  const mintToken=async()=>{
    const mintIx=createMintToInstruction(
      mintKeyPair.publicKey,
      ata,
      publicKey,
       1_000_000_000

    );
   const mintTx = new Transaction().add(mintIx);
    const txid = await sendTransaction(mintTx, connection);
    await connection.confirmTransaction(txid, 'confirmed');

    console.log("✅ Minted tokens to your ATA!");
    alert("✅ Successfully minted tokens!");
  }

  return (
    <div>
    {!ata?(<button onClick={handleCreateToken} className="p-2 bg-blue-600 text-white rounded mt-4">
        Create Mint
      </button>
    ):  (
       <div>
          <p className="text-green-700 font-semibold">✅ Token Mint Address:</p>
          <p className="break-all">{token}</p>
          <p className="text-green-700 font-semibold mt-2">✅ ATA Address:</p>
          <p className="break-all">{ata}</p>
          <button onClick={mintToken}>MintSomeTokenToYour_Own_ATA</button>
        </div>
    )}
    <button onClick={()=>{
      setShowGet(true);
    }}>Get Token</button>
    {showGet&&<GetToken connection={connection} publicKey={publicKey}/>}
  </div>
  );
};

export default CreateToken;
