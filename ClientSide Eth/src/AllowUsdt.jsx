import React from 'react'
import { useAccount, useWriteContract } from 'wagmi'

const AllowUsdt = () => {
  const { address } = useAccount()
  const { data: hash, writeContract } = useWriteContract()
  const [amount, setAmount] = React.useState('')

  async function submit(e) {
    e.preventDefault()
    try {
      writeContract({
        address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', // USDT Mainnet
        abi: [
          {
            constant: false,
            inputs: [
              { name: '_spender', type: 'address' },
              { name: '_value', type: 'uint256' },
            ],
            name: 'approve',
            outputs: [{ name: '', type: 'bool' }],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
          },
        ],
        functionName: 'approve',
        args: [
          '0xbC9303E08fCA44dFf9323cb683A39F03bB6545e5',
          BigInt(parseFloat(amount) * 10 ** 6), // USDT = 6 decimals
        ],
      })
    } catch (err) {
      console.error('Approval error:', err)
    }
  }

  return (
    <div>
      <h2>Approve USDT Spend</h2>
      <form onSubmit={submit}>
        <input
          name="amount"
          placeholder="Amount (e.g., 100 USDT)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Approve</button>
      </form>

      {hash && <div>✅ Transaction Hash: {hash}</div>}
    </div>
  )
}

export default AllowUsdt
