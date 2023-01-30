const ZOOZToken = artifacts.require("ZOOZToken");

function pause(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

contract('Balances Of tests', (wallets) => { 
  it('should be balancesOf 2 holders', async () => {
	const zooz = await ZOOZToken.deployed();
	
	await zooz.transfer(wallets[1], "15000", { from: wallets[0] }); 
	await zooz.transfer(wallets[2], "25000", { from: wallets[0] }); 
	await zooz.transfer(wallets[3], "35000", { from: wallets[0] }); 
	await zooz.transfer(wallets[4], "45000", { from: wallets[0] }); 
	await zooz.transfer(wallets[5], "55000", { from: wallets[0] }); 
	await zooz.transfer(wallets[6], "65000", { from: wallets[0] }); 
	await zooz.transfer(wallets[7], "75000", { from: wallets[0] }); 
	await zooz.transfer(wallets[8], "85000", { from: wallets[0] }); 
	await zooz.transfer(wallets[9], "95000", { from: wallets[0] }); 
	await zooz.transfer("0x531992572dD16503cBb83F16B1aD9b0507Cc8f50", "770000", { from: wallets[0] }); 
	await zooz.transfer("0x70A76281032A31505253a6AFC368d0b55c938155", "550000", { from: wallets[0] }); 

	var balances = await zooz.balancesOf(["0x531992572dD16503cBb83F16B1aD9b0507Cc8f50", "0x70A76281032A31505253a6AFC368d0b55c938155"]);
	
	assert.equal(2, balances.length);
	assert.equal(770000, balances[0].token);
	assert.equal(550000, balances[1].token);
	assert.notEqual(0, balances[0].timestamp);
	assert.notEqual(0, balances[1].timestamp);
  });
  
  it('should be bulk 12 holders', async () => {
	const zooz = await ZOOZToken.deployed();
	
	var balances = await zooz.balancesOf([
						"0x531992572dD16503cBb83F16B1aD9b0507Cc8f50"
						, wallets[0]
						, wallets[1]
						, wallets[2]
						, wallets[3]
						, wallets[4]
						, wallets[5]
						, wallets[6]
						, wallets[7]
						, wallets[8]
						, wallets[9]
						, "0x70A76281032A31505253a6AFC368d0b55c938155"
						, "0xEdEC56BEca11cEE2b976Eb298cDfFeA9A13e2AE5"
						]);
	
	assert.equal(13, balances.length);
	assert.equal(770000, balances[0].token);
	assert.equal(15000, balances[2].token);
	assert.equal(45000, balances[5].token);
	assert.equal(550000, balances[11].token);
	assert.equal(0, balances[12].token);
	assert.equal(0, balances[12].timestamp);
	
	for(let i = 0; i < balances.length - 1; i++)
		assert.notEqual(0, balances[i].timestamp);
  });
});