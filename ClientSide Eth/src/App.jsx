import { config } from './config'
import './App.css'

import { useAccount, useBalance, useBlock, useBlockNumber, useConnect, WagmiProvider  } from'wagmi'
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query'
import { Account } from './Account'
import TotalSupply from './TotalSupply'
import { useEffect } from 'react'
import SendTransaction from './SendTransaction'
const queryClient = new QueryClient()

function App() {



  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
       <ConnectWallet/>
       <TotalSupply/>
       <SendTransaction/>
      </QueryClientProvider>
    </WagmiProvider>
  )
}


function ConnectWallet(){
  const {isConnected,address}=useAccount();
  console.log("Address",address);
  
  console.log("Use Block",useBlock(22776065));
  // console.log("Use Account",address);
  
  if(isConnected) return <Account/>
  return <WalletOptions/>
}


function WalletOptions() {
  
  const {data:blockNumber}=useBlockNumber({watch:true});
  const { data: balance, queryKey } = useBalance();
  //Access the query cache system
  //Gives you accesss tp tenstack query global cache system

  const queryClient=useQueryClient();

useEffect(() => {
  queryClient.invalidateQueries({ queryKey })
}, [blockNumber])

  console.log("New Block Number is ",blockNumber);
  
 
  const {connectors,connect}=useConnect();
  return connectors.map((connector)=>(
    <button key={connector.uid} onClick={()=>connect({connector})}>
      {connector.name}
    </button>
  ))
}




export default App
