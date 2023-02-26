const ZOOZToken = artifacts.require("ZOOZToken");
const WrapperZOOZToken = artifacts.require("WrapperZOOZToken");

module.exports = function(deployer) {
  deployer.deploy(ZOOZToken, '0x0000000000000000000000000000000000000000');
  deployer.deploy(WrapperZOOZToken, '0x0000000000000000000000000000000000000000');
};
