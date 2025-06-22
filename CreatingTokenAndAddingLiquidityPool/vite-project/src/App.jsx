import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {clusterApiUrl} from '@solana/web3.js';

import { ConnectionProvider,WalletProvider } from '@solana/wallet-adapter-react';
import {WalletModalProvider,WalletMultiButton} from '@solana/wallet-adapter-react-ui';
import CreateToken from './CreateToken';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';



function App() {

 const endpoint=clusterApiUrl('devnet')
const wallets = [new PhantomWalletAdapter()];
  return (
    <ConnectionProvider endpoint={endpoint}>
   <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
        <div className='App'>
          <h1>Create Token</h1>
          <WalletMultiButton/>
          <CreateToken/>
        </div>
      </WalletModalProvider>
    </WalletProvider>
    </ConnectionProvider>
   
  )
}

export default App
