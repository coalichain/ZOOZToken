const ZOOZToken = artifacts.require("ZOOZToken");

contract('Transfer and timestamp tests (with fees)', (wallets) => {
  it('should be transfer with fees', async () => {
    const zooz = await ZOOZToken.deployed();

	await zooz.setPair(wallets[0], true); 
	await zooz.setRewardsTeamAddress(wallets[5]); 
	await zooz.setManagerAddress(wallets[6]); 

	await zooz.transfer(wallets[1], "1000", { from: wallets[0] }); 
	await zooz.transfer(wallets[2], "1000", { from: wallets[0] }); 
	
	await zooz.transfer(wallets[0], "1000", { from: wallets[1] }); 
	await zooz.transfer(wallets[0], "1000", { from: wallets[2] }); 
	
	let balanceA = await zooz.balanceOf(wallets[0]);
	let balanceB = await zooz.balanceOf(wallets[1]);
	let balanceC = await zooz.balanceOf(wallets[2]);
	let balanceRewards = await zooz.balanceOf(wallets[5]);
	
	assert.equal(balanceA.toString(), "769999999999999720"); // 750M - 280 (2x1000*14%)
	assert.equal(balanceB.toString(), 0);
	assert.equal(balanceC.toString(), 0);
	assert.equal(balanceRewards.toString(), "280");
  });
  
  it('should be transfer with fees', async () => {
    const zooz = await ZOOZToken.deployed();

	await zooz.setPair(wallets[0], true); 
	await zooz.setRewardsTeamAddress(wallets[5]); 
	await zooz.setManagerAddress(wallets[6]); 

	await zooz.transfer(wallets[1], "1000", { from: wallets[0] }); 
	await zooz.transfer(wallets[2], "1000", { from: wallets[0] }); 
	
	await zooz.transfer(wallets[0], "1000", { from: wallets[1] }); 
	await zooz.transfer(wallets[0], "1000", { from: wallets[2] }); 
	
	let balanceA = await zooz.balanceOf(wallets[0]);
	let balanceB = await zooz.balanceOf(wallets[1]);
	let balanceC = await zooz.balanceOf(wallets[2]);
	let balanceRewards = await zooz.balanceOf(wallets[5]);
	
	assert.equal(balanceA.toString(), "769999999999999440"); // 750M - 280 (2x1000*14%)
	assert.equal(balanceB.toString(), 0);
	assert.equal(balanceC.toString(), 0);
	assert.equal(balanceRewards.toString(), "560");
  });
  
  it('should be transfer with fees after new exchange added', async () => {
    const zooz = await ZOOZToken.deployed();

	await zooz.setPair(wallets[9], true); 
	await zooz.setRewardsTeamAddress(wallets[8]); 

	await zooz.transfer(wallets[1], "1000", { from: wallets[0] }); 
	await zooz.transfer(wallets[2], "1000", { from: wallets[0] }); 
	
	await zooz.transfer(wallets[9], "1000", { from: wallets[1] }); 
	await zooz.transfer(wallets[9], "1000", { from: wallets[2] }); 
	
	let balanceNewExchange = await zooz.balanceOf(wallets[9]);
	let balanceB = await zooz.balanceOf(wallets[1]);
	let balanceC = await zooz.balanceOf(wallets[2]);
	let balanceRewards = await zooz.balanceOf(wallets[8]);
	
	assert.equal(balanceNewExchange.toString(), "1720"); // 
	assert.equal(balanceB.toString(), 0);
	assert.equal(balanceC.toString(), 0);
	assert.equal(balanceRewards.toString(), "280");
  });
  
  it('should not be transfer with fees after exchange removed', async () => {
    const zooz = await ZOOZToken.deployed();

	await zooz.setPair(wallets[9], false); 
	await zooz.setRewardsTeamAddress(wallets[8]); 

	await zooz.transfer(wallets[1], "1000", { from: wallets[0] }); 
	await zooz.transfer(wallets[2], "1000", { from: wallets[0] }); 
	
	await zooz.transfer(wallets[9], "1000", { from: wallets[1] }); 
	await zooz.transfer(wallets[9], "1000", { from: wallets[2] }); 
	
	let balanceNewExchange = await zooz.balanceOf(wallets[9]);
	let balanceB = await zooz.balanceOf(wallets[1]);
	let balanceC = await zooz.balanceOf(wallets[2]);
	let balanceRewards = await zooz.balanceOf(wallets[8]);
	
	assert.equal(balanceNewExchange.toString(), "3720"); // 
	assert.equal(balanceB.toString(), 0);
	assert.equal(balanceC.toString(), 0);
	assert.equal(balanceRewards.toString(), "280");
  });
});