// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./ZOOZToken.sol";

contract WrapperZOOZToken is ZOOZToken {

	constructor(bool activePinkAntiBot) 
		ZOOZToken(activePinkAntiBot) {
			
	}
	
	function holdDateHook(address sender, address recipient) public {
		_holdDateHook(sender, recipient);
    }

	function getFees(uint timestamp) public view returns(uint256) {
		return _getFees(timestamp);
	}	

	function getPair(address pair) public view returns(bool) {
		return pairs[pair];
	}	
	
	function isItBotAddress(address bot) public view returns(bool) {
		return _isItBotAddress(bot);
	}
	
	function isBlockedAddress(address wallet) public view returns(bool) {
		return _isBlockedAddress(wallet);
	}	
}
