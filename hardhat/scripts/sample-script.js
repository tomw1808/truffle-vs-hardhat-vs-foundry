// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const SampleToken = await ethers.getContractFactory("SampleToken");
  const sampleToken = await SampleToken.deploy("Sample Token", "TOK", (50 * 10e18).toString());
  await sampleToken.deployed();

   
  const StakingToken = await ethers.getContractFactory("StakingToken");
  const stakingToken = await StakingToken.deploy("Staking Token", "STA", sampleToken.address);
  await stakingToken.deployed();

  const grantBurnTx = await sampleToken.grantRole(await sampleToken.BURNERROLE(), stakingToken.address);
  await grantBurnTx.wait();

  
  const grantMintTx = await sampleToken.grantRole(await sampleToken.MINTERROLE(), stakingToken.address);
  await grantMintTx.wait();

  const stakeFiftyTx = await stakingToken.stake((5*10e18).toString());

  // // wait until the transaction is mined
  await stakeFiftyTx.wait();


  console.log("StakingToken deployed to:", stakingToken.address);
  console.log("SampleToken deployed to:", sampleToken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
