const hre = require('hardhat');
async function main() {
  const [signer] = await ethers.getSigners();
  console.log('Signer address', signer.address);
  /**
   * Contract factory
   */
  const NFT = await hre.ethers.getContractFactory('BraveTest');
  // const URI = 'something';

  /**
   * Owner of the nft and contract addresses
   */
  const WALLET_ADDRESS = '0xF758e816b602feB404948626B2f7f16E948a578c';
  const CONTRACT_ADDRESS = '0x7a5A62E3Fd0038D94FFD31e428a43d236970eDdc';

  /**
   * Returns a new instance of the Contract attached to a new address
   */
  const contract = NFT.attach(CONTRACT_ADDRESS);

  /**
   * Minting a new NFT
   */
  const txResult = await contract.awardItem(WALLET_ADDRESS, '');
  console.log('Tx1 Result:', txResult);
  const txResult2 = await contract.owner();
  console.log('Tx2 Result:', txResult2);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
