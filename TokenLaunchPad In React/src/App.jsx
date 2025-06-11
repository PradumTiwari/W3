import React from "react";
import {ConnectionProvider,WalletProvider} from "@solana/wallet-adapter-react";

import { WalletModalProvider,WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import CreateToken from "./CreateToken";


import '@solana/wallet-adapter-react-ui/styles.css' 

const App=()=>{
const network='devnet';
const endpoint=clusterApiUrl(network);
console.log("EndPoints Url is",endpoint);
const wallets=[new PhantomWalletAdapter()];

return(
  <ConnectionProvider endpoint={endpoint}>
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
       <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
            <h1>🚀 Solana Token Launchpad</h1>
            <WalletMultiButton/>
            <hr style={{margin:"1rem 0"}} />
            <CreateToken/>
            </div> 
      </WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
)


}


export default App;