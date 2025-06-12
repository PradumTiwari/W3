import './App.css'
import { TokenLaunchpad } from './components/TokenLaunchpad'
import {ConnectionProvider,WalletProvider} from "@solana/wallet-adapter-react";
import {WalletModalProvider,WalletDisconnectButton,WalletMultiButton, WalletConnectButton} from "@solana/wallet-adapter-react-ui";
import '@solana/wallet-adapter-react-ui/styles.css';
import { clusterApiUrl } from '@solana/web3.js';

function App() {
  const network='devnet';
  const endpoint=clusterApiUrl(network);
  console.log("Endpoint Url is :-",endpoint);
  
  return (
    <div>
     <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
         <WalletModalProvider>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: 20
              }}>
                <WalletMultiButton/>
                <WalletConnectButton/>
              </div>
              <TokenLaunchpad></TokenLaunchpad>
              </WalletModalProvider>
      </WalletProvider>

     </ConnectionProvider>
    </div>
   
  )
}

export default App
