const bip39=require('bip39');
const ed25519=require('ed25519-hd-key');
const {Keypair}=require('@solana/web3.js');
//Stp1 generate A 12 word mnemonic




const path="m/44'/501'/0'/0'";

async function generateKey(){
    const mnemonic=await bip39.generateMnemonic();
console.log("Your Mnemonic is:- ",mnemonic);

const seed= await  bip39.mnemonicToSeed(mnemonic);
console.log("Seed is :-----",seed.toString("hex"));
const derived=await ed25519.derivePath(path,seed);

//Generate Solanan key pair

const keypair=Keypair.fromSeed(derived.key);

console.log("Public address",keypair.publicKey.toBase58());

console.log("Private key: ",Buffer.from(keypair.secretKey).toString("hex"));


}



generateKey();


