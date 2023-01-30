const ZOOZToken = artifacts.require("ZOOZToken");
const WrapperZOOZToken = artifacts.require("WrapperZOOZToken");

module.exports = function(deployer) {
  deployer.deploy(ZOOZToken);
  deployer.deploy(WrapperZOOZToken);
};
