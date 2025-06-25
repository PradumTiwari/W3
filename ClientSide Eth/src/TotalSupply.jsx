import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useBalance, useBlockNumber, useReadContract } from 'wagmi';
import AllowUsdt from './AllowUsdt';

const TotalSupply = () => {
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const queryClient = useQueryClient();

  const contract = {
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    abi: [
      {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'totalSupply',
    chainId:1,
  };

  const { data, isLoading, error } = useReadContract(contract);

  useEffect(() => {
    const queryKey = [
  'readContract',
  {
    address: contract.address,
    abi: contract.abi,
    functionName: contract.functionName,
    args: undefined,
    chainId: 1,
  },
]

    queryClient.invalidateQueries({ queryKey }); // ✅ Mark as stale on new block
  }, [blockNumber]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      Total Supply is {data?.toString()}
      <GetBalance/>
      <AllowUsdt/>
    </div>
  );
};



function GetBalance(){
 const { data, isLoading } = useBalance({
  address: '0xbC9303E08fCA44dFf9323cb683A39F03bB6545e5',
  chainId: 11155111, // Sepolia
  watch:true,
})

console.log("balance data is",data);


  return(
    <div>
      Balance of the User is {data?.formatted} {data?.symbol}
    </div>
  )
}

export default TotalSupply;
