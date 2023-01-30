const ZOOZToken = artifacts.require("ZOOZToken");

module.exports = function(deployer) {
  deployer.deploy(ZOOZToken);
};
