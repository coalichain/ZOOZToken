// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./ZOOZToken.sol";

contract WrapperZOOZToken is ZOOZToken {
	function holdDateHook(address sender, address recipient) public {
		_holdDateHook(sender, recipient);
    }

	function getFees(uint timestamp) public view returns(uint256) {
		return _getFees(timestamp);
	}	

	function getPair(address pair) public view returns(bool) {
		return _pairs[pair];
	}	
	
	function getBot(address bot) public view returns(bool) {
		return _bots[bot];
	}
	
	function getBlocked(address wallet) public view returns(bool) {
		return _blocked[wallet];
	}	
}
