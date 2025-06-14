import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useQuery } from '@tanstack/react-query'

  const fetchCryptoPrice=async()=>{
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
  if (!response.ok) throw new Error('Failed to fetch price');
  const data = await response.json();
  return data.ethereum.usd;
  }


function App() {

const {data:price,isLoading,isError,error,refetch}=useQuery({
  queryKey:['ethPrice'],
  queryFn:fetchCryptoPrice,
})
 if (isLoading) return <p>Loading ETH price...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
       <div>
      <h1>Ethereum Price:</h1>
      <h2>${price}</h2>
      <button onClick={() => refetch()}>Refresh</button>
    </div>
  )
}

export default App
