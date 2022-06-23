const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SampleToken", function () {
  it("Should return the new greeting once it's changed", async function () {
    const SampleToken = await ethers.getContractFactory("SampleToken");
    const sampleToken = await SampleToken.deploy("Sample Token", "TOK", 50 * 10^18);
    await sampleToken.deployed();

    expect(await sampleToken.totalSupply()).to.equal(50*10^18);

    
    const StakingToken = await ethers.getContractFactory("StakingToken");
    const stakingToken = await StakingToken.deploy("Staking Token", "STA", sampleToken.address);
    await stakingToken.deployed();

    const grantBurnTx = await sampleToken.grantRole(await sampleToken.BURNERROLE(), stakingToken.address);
    await grantBurnTx.wait();

    
    const grantMintTx = await sampleToken.grantRole(await sampleToken.MINTERROLE(), stakingToken.address);
    await grantMintTx.wait();

    const stakeFiftyTx = await stakingToken.stake(50*10^18);

    // // wait until the transaction is mined
    await stakeFiftyTx.wait();

    const accounts = await ethers.getSigners();

    expect(await stakingToken.balanceOf(accounts[0].address)).to.equal(50*10^18);
  });
});
