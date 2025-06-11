import React, { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

import {
  PublicKey,
  Transaction,
} from '@solana/web3.js';

import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
} from '@solana/spl-token';

import {
  createCreateMetadataAccountV3Instruction,
  PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID,
} from '@metaplex-foundation/mpl-token-metadata';

const CreateToken = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [supply, setSupply] = useState('');
  const [image, setImage] = useState('');

  const create = async () => {
    if (!publicKey) return alert('Connect Wallet First');

    // 1. Create Mint
    const mint = await createMint(connection, publicKey, publicKey, null, 9);
    console.log('Mint Address:', mint.toBase58());

    // 2. Get Token Account
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      publicKey,
      mint,
      publicKey
    );

    const amount = parseFloat(supply) * Math.pow(10, 9);

    // 3. Mint tokens
    await mintTo(
      connection,
      publicKey,
      mint,
      tokenAccount.address,
      publicKey,
      amount
    );

    // 4. Create Metadata
    const metadataPDA = PublicKey.findProgramAddressSync(
      [
        Buffer.from('metadata'),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
      ],
      TOKEN_METADATA_PROGRAM_ID
    )[0];

    const data = {
      name,
      symbol,
      uri: image,
      sellerFeeBasisPoints: 0,
      creators: null,
      collection: null,
      uses: null,
    };

    const metadataIx = createCreateMetadataAccountV3Instruction(
      {
        metadata: metadataPDA,
        mint,
        mintAuthority: publicKey,
        payer: publicKey,
        updateAuthority: publicKey,
      },
      {
        createMetadataAccountArgsV3: {
          data,
          isMutable: true,
          collectionDetails: null,
        },
      }
    );

    const tx = new Transaction().add(metadataIx);
    await sendTransaction(tx, connection);

    alert(`✅ Token Created!\nMint Address: ${mint.toBase58()}`);
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <br />
      <input placeholder="Symbol" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
      <br />
      <input placeholder="Initial Supply" value={supply} onChange={(e) => setSupply(e.target.value)} />
      <br />
      <input placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
      <br />
      <button onClick={create}>Create</button>
    </div>
  );
};

export default CreateToken;
