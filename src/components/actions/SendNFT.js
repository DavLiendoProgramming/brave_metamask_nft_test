import React from 'react';

/**
 * Calling the contract
 */
const Contract = require('web3-eth-contract');

export const SendNFT = () => {
  const onClick = async () => {
    console.log('ypou clicked me');
  };
  return <button onClick={onClick}>Send NFT</button>;
};
