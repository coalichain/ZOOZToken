const WrapperZOOZToken = artifacts.require("WrapperZOOZToken");

contract('Set Blocked addresses tests', (wallets) => {
  it('should not be blocked', async () => {
    const zooz = await WrapperZOOZToken.deployed();

	await zooz.setGovernance(wallets[9], 1);
	await zooz.setGovernance(wallets[8], 2);
	await zooz.setGovernance(wallets[7], 3);
	
	let walletA_IsBlocked = await zooz.isBlocked(wallets[1]);
	let walletB_IsBlocked = await zooz.isBlocked(wallets[2]);
	
	assert.equal(false, walletA_IsBlocked);
	assert.equal(false, walletB_IsBlocked);
  });
  
  it('should be blocked', async () => {
    const zooz = await WrapperZOOZToken.deployed();

	await zooz.setBlocked(wallets[1], true, { from: wallets[7] });
	await zooz.setBlocked(wallets[1], true, { from: wallets[8] });
	await zooz.setBlocked(wallets[1], true, { from: wallets[9] });
	
	let walletA_IsBlocked = await zooz.isBlocked(wallets[1]);
	let walletB_IsBlocked = await zooz.isBlocked(wallets[2]);
	
	assert.equal(true, walletA_IsBlocked);
	assert.equal(false, walletB_IsBlocked);
	
	await zooz.setBlocked(wallets[2], false, { from: wallets[7] });
	await zooz.setBlocked(wallets[2], false, { from: wallets[8] });
	await zooz.setBlocked(wallets[2], false, { from: wallets[9] });
	
	walletA_IsBlocked = await zooz.isBlocked(wallets[1]);
	walletB_IsBlocked = await zooz.isBlocked(wallets[2]);
	
	assert.equal(true, walletA_IsBlocked);
	assert.equal(false, walletB_IsBlocked);
  });
  
  it('should be unblocked', async () => {
    const zooz = await WrapperZOOZToken.deployed();

	await zooz.setBlocked(wallets[1], false, { from: wallets[7] });
	await zooz.setBlocked(wallets[1], false, { from: wallets[8] });
	await zooz.setBlocked(wallets[1], false, { from: wallets[9] });
	
	let walletA_IsBlocked = await zooz.isBlocked(wallets[1]);
	let walletB_IsBlocked = await zooz.isBlocked(wallets[2]);
	
	assert.equal(false, walletA_IsBlocked);
	assert.equal(false, walletB_IsBlocked);
	
	await zooz.setBlocked(wallets[1], true, { from: wallets[7] });
	await zooz.setBlocked(wallets[1], true, { from: wallets[8] });
	await zooz.setBlocked(wallets[1], true, { from: wallets[9] });
	
	walletA_IsBlocked = await zooz.isBlocked(wallets[1]);
	walletB_IsBlocked = await zooz.isBlocked(wallets[2]);
	
	assert.equal(true, walletA_IsBlocked);
	assert.equal(false, walletB_IsBlocked);
  });
  
   it('should be unblocked, because missing governance', async () => {
    const zooz = await WrapperZOOZToken.deployed();

	await zooz.setBlocked(wallets[2], true, { from: wallets[7] });
	await zooz.setBlocked(wallets[2], true, { from: wallets[9] });
	
	let walletB_IsBlocked = await zooz.isBlocked(wallets[2]);
	
	assert.equal(false, walletB_IsBlocked);
	
	await zooz.setBlocked(wallets[2], true, { from: wallets[8] });
	
	walletB_IsBlocked = await zooz.isBlocked(wallets[2]);
	
	assert.equal(true, walletB_IsBlocked);
  });
  
  it('should not be able to change blocked address', async () => {
    const zooz = await WrapperZOOZToken.deployed();	
	let isBlocked;
	
	await Try(() => zooz.setBlocked(wallets[3], true, { from: wallets[1] }));
	isBlocked = await zooz.isBlocked(wallets[3]);	
	assert.equal(false, isBlocked);
	
	await Try(() => zooz.setBlocked(wallets[1], false, { from: wallets[2] }));
	isBlocked = await zooz.isBlocked(wallets[1]);	
	assert.equal(true, isBlocked);
	
	await Try(() => zooz.setBlocked(wallets[4], true, { from: wallets[2] }));	
	isBlocked = await zooz.isBlocked(wallets[4]);	
	assert.equal(false, isBlocked);
  });
});

async function Try(cb) {
	try {
		await cb(); 
	} 
	catch {
		
	}
}