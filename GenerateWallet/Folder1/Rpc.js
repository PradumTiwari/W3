const { Connection, PublicKey } = require('@solana/web3.js');

const SOLANA_RPC='https://solana-mainnet.g.alchemy.com/v2/rxQoJyoPyHwHueRLBPGzYP_IvOzsym4n';

const connection=new Connection(SOLANA_RPC,'confirmed');


const address=new PublicKey('78vHKwQcEDjYusRry9Qs48tMnWo1VyYMQjRmqyVvzRPH');

async function getBalance(){
    const balance=await connection.getBalance(address);
    console.log(`SOL BALANCE: ${balance/1e9}SOL`);//Convert lamports to sol
    
}

getBalance();