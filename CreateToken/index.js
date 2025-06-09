const {Connection, LAMPORTS_PER_SOL, clusterApiUrl, PublicKey} = require('@solana/web3.js');

const connection = new Connection(clusterApiUrl('devnet'));

async function airdrop(publicKey, amount) {
    const airdropSignature = await connection.requestAirdrop(new PublicKey(publicKey), amount);
    await connection.confirmTransaction({signature: airdropSignature})
}

airdrop("CFddn9uS6pomzkzQSjpg2x11iDadPxLXsL8Y66k28odW", LAMPORTS_PER_SOL).then(signature => {
    console.log('Airdrop signature:', signature);
});