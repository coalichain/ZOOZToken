const ZOOZToken = artifacts.require("ZOOZToken");

contract('Transfer and timestamp tests (blocked addresses)', (wallets) => {
  it('should not be able to receive', async () => {
    const zooz = await ZOOZToken.deployed();

	await zooz.setGovernance(wallets[9], 1);
	await zooz.setGovernance(wallets[8], 2);
	await zooz.setGovernance(wallets[7], 3);

	await zooz.setBlocked(wallets[1], true, { from: wallets[7] });
	await zooz.setBlocked(wallets[1], true, { from: wallets[8] });
	await zooz.setBlocked(wallets[1], true, { from: wallets[9] });
	
	try {
		await zooz.transfer(wallets[1], "1000000000000000", { from: wallets[0] }); 
	}
	catch {}
		
	let balanceA = await zooz.balanceOf(wallets[0]);
	let balanceB = await zooz.balanceOf(wallets[1]);
	
	assert.equal(balanceA.toString(), "750000000000000000");
	assert.equal(balanceB.toString(), 0);
  });
  
  it('should not be able to send', async () => {
    const zooz = await ZOOZToken.deployed();

	await zooz.setBlocked(wallets[1], false, { from: wallets[7] });
	await zooz.setBlocked(wallets[1], false, { from: wallets[8] });
	await zooz.setBlocked(wallets[1], false, { from: wallets[9] });

	await zooz.transfer(wallets[1], "1000000000000000", { from: wallets[0] }); 
	
	await zooz.setBlocked(wallets[1], true, { from: wallets[7] });
	await zooz.setBlocked(wallets[1], true, { from: wallets[8] });
	await zooz.setBlocked(wallets[1], true, { from: wallets[9] });

	try {
		await zooz.transfer(wallets[0], "1000000000000000", { from: wallets[1] }); 
	}
	catch {}
		
	let balanceA = await zooz.balanceOf(wallets[0]);
	let balanceB = await zooz.balanceOf(wallets[1]);
	
	assert.equal(balanceA.toString(), "749000000000000000");
	assert.equal(balanceB.toString(), "1000000000000000");
  });    
});