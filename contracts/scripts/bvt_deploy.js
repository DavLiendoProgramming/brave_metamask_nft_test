const hre = require('hardhat');

async function main() {
  const BVT = await hre.ethers.getContractFactory('BraveTest');
  const bvt = await BVT.deploy();

  await bvt.deployed();

  console.log('bvt deployed to:', bvt.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
