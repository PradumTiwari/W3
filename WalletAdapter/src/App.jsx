import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import bs58 from 'bs58'

const App=()=>{
   const {publicKey,signMessage}=useWallet();
  
  const signMyMessage=async()=>{
   
    if(!publicKey){
      alert("Connect Your Wallet first");
      return;
    }
    if(!signMessage){
      alert("Your Wallet Doesnot support Message Signing");
      return;
    }

    try {
      const message=new TextEncoder().encode("Hello from My solana DApp");
      const signature=await signMessage(message);
      const encoded=bs58.encode(signature);
      alert("Message Signed");
      console.log("Signature (base58):", encoded);
        console.log("Wallet:", publicKey.toBase58());
    } catch (error) {
       console.error("Signing failed:", error);
        alert("Failed to sign message.");
    }


  }


  return (
    <div>
      <WalletMultiButton/>
      {publicKey && (
    <button onClick={signMyMessage} style={{ marginTop: '10px' }}>
        Sign Message
    </button>)}
    </div>
  )
  
}



export default App;
