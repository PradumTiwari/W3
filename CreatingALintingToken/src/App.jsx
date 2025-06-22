import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CreateToken from './CreateToken'
import {
  WalletAdapterNetwork
} from '@solana/wallet-adapter-base';
import {
  ConnectionProvider,
  WalletProvider
} from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter
} from '@solana/wallet-adapter-wallets';
import {clusterApiUrl} from '@solana/web3.js';

import '@solana/wallet-adapter-react-ui/styles.css';

function App() {
  const network = WalletAdapterNetwork.Devnet;
const endpoint = clusterApiUrl(network);
const wallets = [new PhantomWalletAdapter()];

  return (
    <ConnectionProvider endpoint={endpoint}>
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
    <div className='text-center'>
   <h1 className='text-4xl font-bold my-4 '>Want to Get Your PSOL for Your SOL</h1>
     <WalletMultiButton/>
   <CreateToken />
   
  
    </div>
   
    </WalletModalProvider>
   </WalletProvider>
  </ConnectionProvider>
  )
}

export default App
