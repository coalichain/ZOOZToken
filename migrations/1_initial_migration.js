const ZOOZToken = artifacts.require("ZOOZToken");

module.exports = function(deployer) {
  deployer.deploy(ZOOZToken, '0x0000000000000000000000000000000000000000');
};
