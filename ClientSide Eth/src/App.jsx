import { config } from './config'
import './App.css'

import { useAccount, useConnect, WagmiProvider  } from'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Account } from './Account'
import TotalSupply from './TotalSupply'
const queryClient = new QueryClient()

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
       <ConnectWallet/>
       <TotalSupply/>
      </QueryClientProvider>
    </WagmiProvider>
  )
}


function ConnectWallet(){
  const {isConnected}=useAccount();
  if(isConnected) return <Account/>
  return <WalletOptions/>
}


function WalletOptions() {
 
  const {connectors,connect}=useConnect();
  return connectors.map((connector)=>(
    <button key={connector.uid} onClick={()=>connect({connector})}>
      {connector.name}
    </button>
  ))
}




export default App
