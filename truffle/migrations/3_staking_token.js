const StakingToken = artifacts.require("StakingToken");
const SampleToken = artifacts.require("SampleToken");

module.exports = async function (deployer) {
  
  const sampleToken = await SampleToken.deployed();
  await deployer.deploy(StakingToken, "Staking Token", "STA", sampleToken.address);

  const stakingToken = await StakingToken.deployed();
  await sampleToken.grantRole(await sampleToken.MINTERROLE(), stakingToken.address);
  await sampleToken.grantRole(await sampleToken.BURNERROLE(), stakingToken.address);
  
};
