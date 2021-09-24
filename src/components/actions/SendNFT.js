import React from 'react';

/**
 * Calling the contract
 */
const Contract = require('web3-eth-contract');

export const SendNFT = () => {
  const onClick = async () => {
    console.log('you clicked me');
  };
  return (
    <button
      className="bg-purple-700 px-2 py-1 rounded text-base font-bold"
      onClick={onClick}
    >
      Send NFT
    </button>
  );
};
