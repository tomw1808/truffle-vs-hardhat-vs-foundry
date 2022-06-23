// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import "./SampleToken.sol";


contract StakingToken is ERC20 {

    uint public deployTimestamp;

    SampleToken sampleToken;
    constructor(string memory tokenName, string memory tokenSymbol, address _sampleToken) ERC20(tokenName, tokenSymbol) {
        deployTimestamp = block.timestamp;
        sampleToken = SampleToken(_sampleToken);
    }

    function stake(uint amountInTok) public {
        uint amountInSta = amountInTok / (((block.timestamp - deployTimestamp) / 1 hours) + 1);
        sampleToken.burn(msg.sender, amountInTok);
        _mint(msg.sender, amountInSta);
    }

    function unstake(uint amountInSta) public {
        uint amountInTok = amountInSta * (((block.timestamp - deployTimestamp) / 1 hours) + 1);
        sampleToken.mint(msg.sender, amountInTok);
        _burn(msg.sender, amountInSta);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) override internal {
        require(from == address(0) || to == address(0), "Staking: Transfer is not possible");
        super._beforeTokenTransfer(from, to, amount);
    }

}