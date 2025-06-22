const solananWeb3=require('@solana/web3.js');
const fs=require('fs');

const {Keypair,Connection,SystemProgram,Transaction,sendAndConfirmTransaction}=solananWeb3;


const connection=new Connection(solananWeb3.clusterApiUrl('devnet'),'confirmed');


const payer=Keypair.fromSecretKey(
    new Uint8Array(JSON.parse(fs.readFileSync()))
)


const dataAccount=Keypair.generate();

const space=100;
const lamports=await connection.getMinimumBalanceForRentExemption(space);


const createAccountIx=SystemProgram.createAccount({
    fromPubkey:payer.publicKey,
    newAccountPubkey:dataAccount.publicKey,
    lamports,
    space,
    programId:SystemProgram.programId,
})

const data=Buffer.from("Hello World");


const writeIx={
    keys:[
        {pubKey:dataAccount.publicKey,isSigner:false,isWritable:true}
    ],
    programId:SystemProgram.programId,
    data:data,
}

const tx = new Transaction().add(createAccountIx, writeIx);
const txId = await sendAndConfirmTransaction(connection, tx, [payer, dataAccount]);

console.log("Created & stored data. Transaction ID:", txId);
