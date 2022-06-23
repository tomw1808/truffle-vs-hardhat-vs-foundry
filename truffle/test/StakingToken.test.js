const StakingToken = artifacts.require("StakingToken");
const truffleAssert = require('truffle-assertions');


contract("StakingToken", (accounts) => {
    it("is possible to stake 50 TOK", async() => {
        const stakingToken = await StakingToken.deployed();
        await truffleAssert.eventEmitted(await stakingToken.stake(50), "Transfer");
        assert.equal((await stakingToken.balanceOf(accounts[0])).toString(), "50");
    })
})