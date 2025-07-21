import { getAssociatedTokenAddress,TOKEN_PROGRAM_ID,createMint,mintTo,getAccount, getOrCreateAssociatedTokenAccount} from "@solana/spl-token";
import { PublicKey,Connection,clusterApiUrl,Keypair,LAMPORTS_PER_SOL,sendAndConfirmTransaction } from "@solana/web3.js";


//Replace this with your 

async function main(){
    const connection=new Connection(clusterApiUrl("devnet"),"confirmed");
    //Generate a keypiar
    const payer=Keypair.generate();
    console.log("Wallet:",payer.publicKey.toBase58());

    const airdropsig=await connection.requestAirdrop(payer.publicKey,LAMPORTS_PER_SOL*2);
    await connection.confirmTransaction(airdropsig,"confirmed");

    console.log("Airdropped 2 SOL to Payer");

    //Step 3 create your Own usdc mint

    const decimals=6;
    const mint=await createMint(
        connection,
        payer,
        payer.publicKey,
        null,
        decimals,
    );

    console.log("Created Mint",mint.toBase58());

    //Derive and create ATA
    const ata=await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        mint,
        payer.publicKey,
    );

    console.log("Ata address",ata.address.toBase58());

    //Step 5 Mint 100 token into the ATA
    const amount=100*10**decimals;
    await mintTo(
       connection,
       payer,
       mint,
       ata.address,
       payer,
       amount
    );

     console.log(`✅ Minted ${amount / 10 ** decimals} tokens to your ATA`);

      const account = await getAccount(connection, ata.address);
  console.log("💰 Token Balance:", Number(account.amount) / 10 ** decimals);

    
    
    
}

main().catch(console.error);