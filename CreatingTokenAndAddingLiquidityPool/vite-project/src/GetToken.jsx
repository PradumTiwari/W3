import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import React, { useState, useEffect } from 'react';

const GetToken = ({ connection, publicKey }) => {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const fetchTokenAccounts = async () => {
      if (!publicKey) return;

      try {
        const tokenAccounts = await connection.getTokenAccountsByOwner(publicKey, {
          programId: TOKEN_PROGRAM_ID,
        });

        const parsedTokens = tokenAccounts.value.map((account) => {
          return {
            pubkey: account.pubkey.toBase58(),
            mint: account.account.data.slice(0, 32), // raw bytes, can be decoded further
          };
        });

        setTokens(parsedTokens);
      } catch (err) {
        console.error("Error fetching token accounts:", err);
      }
    };

    fetchTokenAccounts();
  }, [connection, publicKey]);

  return (
    <div className="mt-6">
      <h2 className="font-bold text-lg">🪙 Token Accounts Owned by You:</h2>
      {tokens.length === 0 ? (
        <p>No tokens found.</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {tokens.map((token, index) => (
            <li key={index} className="p-2 border rounded text-sm bg-gray-100">
              <strong>Account:</strong> {token.pubkey}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetToken;
