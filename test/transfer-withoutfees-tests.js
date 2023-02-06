const ZOOZToken = artifacts.require("ZOOZToken");

contract('Transfer and timestamp tests (without fees)', (wallets) => {
  it('should be transfer without fees', async () => {
    const zooz = await ZOOZToken.deployed();

	await zooz.transfer(wallets[1], "1000000000000000", { from: wallets[0] }); 
	await zooz.transfer(wallets[2], "1000000000000000", { from: wallets[0] }); 
	await zooz.transfer(wallets[3], "3000000000000000", { from: wallets[0] }); 
	
	await zooz.transfer("0x0000000000000000000000000000000000000000", "1000000000000000", { from: wallets[0] }); 
	await zooz.transfer("0x0000000000000000000000000000000000000000", "1000000000000000", { from: wallets[1] }); 
	await zooz.transfer("0x0000000000000000000000000000000000000000", "3000000000000000", { from: wallets[3] }); 
	
	let balanceA = await zooz.balanceOf(wallets[0]);
	let balanceB = await zooz.balanceOf(wallets[1]);
	let balanceC = await zooz.balanceOf(wallets[2]);
	let balanceD = await zooz.balanceOf(wallets[3]);
	let balanceBurn = await zooz.balanceOf("0x0000000000000000000000000000000000000000");
	
	assert.equal(balanceA.toString(), "744000000000000000");
	assert.equal(balanceB.toString(), 0);
	assert.equal(balanceC.toString(), "1000000000000000");
	assert.equal(balanceD.toString(), 0);
	assert.equal(balanceBurn.toString(), "5000000000000000");
  });
  
  it('should be transfer without fees (with setPair true)', async () => {
    const zooz = await ZOOZToken.deployed();

	await zooz.setPair(wallets[0], true); 
	await zooz.transfer(wallets[1], "1000000000000000", { from: wallets[0] }); 
	await zooz.transfer(wallets[2], "1000000000000000", { from: wallets[0] }); 
	await zooz.transfer(wallets[3], "3000000000000000", { from: wallets[0] }); 
	
	await zooz.transfer("0x0000000000000000000000000000000000000000", "1000000000000000", { from: wallets[0] }); 
	await zooz.transfer("0x0000000000000000000000000000000000000000", "1000000000000000", { from: wallets[1] }); 
	await zooz.transfer("0x0000000000000000000000000000000000000000", "3000000000000000", { from: wallets[3] }); 
	
	let balanceA = await zooz.balanceOf(wallets[0]);
	let balanceB = await zooz.balanceOf(wallets[1]);
	let balanceC = await zooz.balanceOf(wallets[2]);
	let balanceD = await zooz.balanceOf(wallets[3]);
	let balanceBurn = await zooz.balanceOf("0x0000000000000000000000000000000000000000");
	
	assert.equal(balanceA.toString(), "738000000000000000");
	assert.equal(balanceB.toString(), 0);
	assert.equal(balanceC.toString(), "2000000000000000");
	assert.equal(balanceD.toString(), 0);
	assert.equal(balanceBurn.toString(), "10000000000000000");
  });
  
  it('should be transfer without fees (with setPair true + setBot true)', async () => {
    const zooz = await ZOOZToken.deployed();

	await zooz.setGovernance(wallets[9], 1);
	await zooz.setGovernance(wallets[8], 2);
	await zooz.setGovernance(wallets[7], 3);
	
	await zooz.setBot(wallets[2], true, { from: wallets[7] });
	await zooz.setBot(wallets[2], true, { from: wallets[8] });
	await zooz.setBot(wallets[2], true, { from: wallets[9] });

	await zooz.transfer(wallets[0], "2000000000000000", { from: wallets[2] }); 
		
	let balanceA = await zooz.balanceOf(wallets[0]);
	let balanceC = await zooz.balanceOf(wallets[2]);
	let balanceBurn = await zooz.balanceOf("0x0000000000000000000000000000000000000000");
	
	assert.equal(balanceA.toString(), "740000000000000000");
	assert.equal(balanceC.toString(), "0");
	assert.equal(balanceBurn.toString(), "10000000000000000");
  });
});