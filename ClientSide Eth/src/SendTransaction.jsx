import React, { useState } from 'react'
import { useSendTransaction } from 'wagmi'
import { parseEther } from 'viem' // ✅ you forgot to import this!

const SendTransaction = () => {
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')

  const {
    data,
    sendTransaction,
    isPending,
    isSuccess,
    error,
  } = useSendTransaction()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      sendTransaction({
        to,
        value: parseEther(amount), // ✅ remove the semicolon here!
      })
    } catch (err) {
      console.error('Transaction failed', err) // ✅ you wrote `error` but used `err` — fixed
    }
  }

  return (
    <div>
      <h2>Want to Transfer Ether</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="address"
          placeholder="0xA0Cf…251e"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />
        <input
          name="value"
          placeholder="0.05"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit" disabled={isPending}>
          {isPending ? 'Sending...' : 'Send'}
        </button>
      </form>

      {isSuccess && <p>✅ Transaction sent! Hash: {data?.hash}</p>}
      {error && <p style={{ color: 'red' }}>❌ Error: {error.message}</p>}
    </div>
  )
}

export default SendTransaction
