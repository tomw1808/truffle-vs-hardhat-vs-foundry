// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "../src/SampleToken.sol";
import "../src/StakingToken.sol";

contract StakingTokenTest is Test {
    SampleToken token;
    StakingToken staking;

    function setUp() public {
        token = new SampleToken("Sample Token", "TOK", 100 ether);
        staking = new StakingToken("Staking Token", "STA", address(token));

        token.grantRole(token.MINTERROLE(), address(staking));
        token.grantRole(token.BURNERROLE(), address(staking));
    }

    function testStaking() public {
        assertEq(token.balanceOf(address(this)), 100 ether);
        assertEq(staking.balanceOf(address(this)), 0 ether);

        staking.stake(5 ether);

        assertEq(token.balanceOf(address(this)), 95 ether);
        assertEq(staking.balanceOf(address(this)), 5 ether);
    }
}
