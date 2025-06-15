import React from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  createInitializeMintInstruction,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID
} from '@solana/spl-token';
import {
  Keypair,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';

const CreateToken = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const handleCreateToken = async () => {
    if (!publicKey || !sendTransaction) {
      alert("Please connect your wallet first");
      return;
    }

    try {
      // ✅ Step 1: Generate new mint keypair
      const mintKeyPair = Keypair.generate();

      // ✅ Step 2: Get minimum rent-exempt lamports for mint account
      const lamports = await getMinimumBalanceForRentExemptMint(connection);

      // ✅ Step 3: Create transaction
      const transaction = new Transaction();

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


      console.log("✅ Mint created at:", mintKeyPair.publicKey.toBase58());


      
      alert(`✅ Mint created!\n\nAddress: ${mintKeyPair.publicKey.toBase58()}`);
    } catch (error) {
      console.error("❌ Error creating mint:", error);
      alert(`❌ Error:\n${error.message}`);
    }
  };

  return (
    <div>
      <button onClick={handleCreateToken} className="p-2 bg-blue-600 text-white rounded mt-4">
        Create Mint
      </button>
    </div>
  );
};

export default CreateToken;
