import React, { useEffect, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  PublicKey,
  SystemProgram,
  LAMPORTS_PER_SOL,
  Transaction,
  Keypair
} from '@solana/web3.js';
import {
  getOrCreateAssociatedTokenAccount,
  mintTo
} from '@solana/spl-token';

const CreateToken = () => {
  const MINT_ADDRESS = new PublicKey("E1dikrhrwymvJwBwUwAxBfT9SkcwQGpzu68m7C5GVRQ4");

  // Load secret key from .env
  const secretKeyString = import.meta.env.VITE_MINT_AUTHORITY_SECRET;
  if (!secretKeyString || secretKeyString.trim() === "") {
    throw new Error("❌ VITE_MINT_AUTHORITY_SECRET is not set or is empty in your .env file");
  }

  let secretKeyArray;
  try {
    secretKeyArray = JSON.parse(secretKeyString);
  } catch (e) {
    throw new Error("❌ Failed to parse VITE_MINT_AUTHORITY_SECRET: " + e.message);
  }

  const mintAuthority = Keypair.fromSecretKey(Uint8Array.from(secretKeyArray));

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [amount, setAmount] = useState(0);
  const [pub, setPub] = useState('');

  useEffect(() => {
    if (publicKey) setPub(publicKey.toBase58());
  }, [publicKey]);

  // ✅ Auto Airdrop mintAuthority if empty
  useEffect(() => {
    (async () => {
      try {
        const balance = await connection.getBalance(mintAuthority.publicKey);
        if (balance === 0) {
          console.log("Airdropping 1 SOL to mintAuthority...");
          const sig = await connection.requestAirdrop(mintAuthority.publicKey, LAMPORTS_PER_SOL);
          await connection.confirmTransaction(sig);
          console.log("✅ Airdrop successful");
        }
      } catch (err) {
        console.error("Airdrop failed:", err);
      }
    })();
  }, []);

  const TransferSOLAndMint = async () => {
    if (!publicKey) {
      alert("Connect your wallet first!");
      return;
    }

    try {
      // ✅ Step 1: Transfer SOL
      const recipient = new PublicKey("8e3ZA25L1Qh2i5JnqHQa3314uCvk6QuGRf9BXu5p1QQv");
      const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;

      const transferIx = SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: recipient,
        lamports,
      });

      const tx = new Transaction().add(transferIx);
      const sig = await sendTransaction(tx, connection);
      await connection.confirmTransaction(sig);
      console.log("✅ SOL Transfer TX Signature:", sig);

      // ✅ Step 2: Get/Create User's Token Account (ATA)
      const userATA = await getOrCreateAssociatedTokenAccount(
        connection,
        mintAuthority,       // payer for ATA creation
        MINT_ADDRESS,
        publicKey,           // owner of the ATA
        true                 // allow owner off curve
      );

      // ✅ Step 3: Mint PSOL to user's ATA
      const psolAmount = amount * 0.85;

      const mintSig = await mintTo(
        connection,
        mintAuthority,
        MINT_ADDRESS,
        userATA.address,
        mintAuthority,
        psolAmount * 1e6     // 6 decimals
      );

      console.log("✅ Minted PSOL TX:", mintSig);
      alert("✅ SOL transferred and PSOL minted!");
    } catch (error) {
      console.error("Transfer failed:", error);
      alert("❌ Transfer failed: " + error.message);
    }
  };

  return (
    <div>
      <h1>Enter your SOL</h1>
      <input
        type="text"
        placeholder='Amount'
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      {amount > 0 && (
        <h2>Equivalent: {amount * 0.85} PSOL</h2>
      )}
      <button
        className='p-2 bg-amber-800 text-white rounded-xl shadow-xl'
        onClick={TransferSOLAndMint}
      >
        Transfer SOL & Mint PSOL
      </button>
      {pub && <h3>Connected Wallet: {pub}</h3>}
    </div>
  );
};

export default CreateToken;
