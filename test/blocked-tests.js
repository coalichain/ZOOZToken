const WrapperZOOZToken = artifacts.require("WrapperZOOZToken");

contract('Set Blocked addresses tests', (wallets) => {
  it('should not be blocked', async () => {
    const zooz = await WrapperZOOZToken.deployed();

	await zooz.setGovernance(wallets[9], 1);
	await zooz.setGovernance(wallets[8], 2);
	await zooz.setGovernance(wallets[7], 3);
	
	let walletA_isBlockedAddress = await zooz.isBlockedAddress(wallets[1]);
	let walletB_isBlockedAddress = await zooz.isBlockedAddress(wallets[2]);
	
	assert.equal(false, walletA_isBlockedAddress);
	assert.equal(false, walletB_isBlockedAddress);
  });
  
  it('should be blocked', async () => {
    const zooz = await WrapperZOOZToken.deployed();

	await zooz.setBlockedAddress(wallets[1], true, { from: wallets[7] });
	await zooz.setBlockedAddress(wallets[1], true, { from: wallets[8] });
	await zooz.setBlockedAddress(wallets[1], true, { from: wallets[9] });
	
	let walletA_isBlockedAddress = await zooz.isBlockedAddress(wallets[1]);
	let walletB_isBlockedAddress = await zooz.isBlockedAddress(wallets[2]);
	
	assert.equal(true, walletA_isBlockedAddress);
	assert.equal(false, walletB_isBlockedAddress);
	
	await zooz.setBlockedAddress(wallets[2], false, { from: wallets[7] });
	await zooz.setBlockedAddress(wallets[2], false, { from: wallets[8] });
	await zooz.setBlockedAddress(wallets[2], false, { from: wallets[9] });
	
	walletA_isBlockedAddress = await zooz.isBlockedAddress(wallets[1]);
	walletB_isBlockedAddress = await zooz.isBlockedAddress(wallets[2]);
	
	assert.equal(true, walletA_isBlockedAddress);
	assert.equal(false, walletB_isBlockedAddress);
  });
  
  it('should be unblocked', async () => {
    const zooz = await WrapperZOOZToken.deployed();

	await zooz.setBlockedAddress(wallets[1], false, { from: wallets[7] });
	await zooz.setBlockedAddress(wallets[1], false, { from: wallets[8] });
	await zooz.setBlockedAddress(wallets[1], false, { from: wallets[9] });
	
	let walletA_isBlockedAddress = await zooz.isBlockedAddress(wallets[1]);
	let walletB_isBlockedAddress = await zooz.isBlockedAddress(wallets[2]);
	
	assert.equal(false, walletA_isBlockedAddress);
	assert.equal(false, walletB_isBlockedAddress);
	
	await zooz.setBlockedAddress(wallets[1], true, { from: wallets[7] });
	await zooz.setBlockedAddress(wallets[1], true, { from: wallets[8] });
	await zooz.setBlockedAddress(wallets[1], true, { from: wallets[9] });
	
	walletA_isBlockedAddress = await zooz.isBlockedAddress(wallets[1]);
	walletB_isBlockedAddress = await zooz.isBlockedAddress(wallets[2]);
	
	assert.equal(true, walletA_isBlockedAddress);
	assert.equal(false, walletB_isBlockedAddress);
  });
  
   it('should be unblocked, because missing governance', async () => {
    const zooz = await WrapperZOOZToken.deployed();

	await zooz.setBlockedAddress(wallets[2], true, { from: wallets[7] });
	await zooz.setBlockedAddress(wallets[2], true, { from: wallets[9] });
	
	let walletB_isBlockedAddress = await zooz.isBlockedAddress(wallets[2]);
	
	assert.equal(false, walletB_isBlockedAddress);
	
	await zooz.setBlockedAddress(wallets[2], true, { from: wallets[8] });
	
	walletB_isBlockedAddress = await zooz.isBlockedAddress(wallets[2]);
	
	assert.equal(true, walletB_isBlockedAddress);
  });
  
  it('should not be able to change blocked address', async () => {
    const zooz = await WrapperZOOZToken.deployed();	
	let isBlockedAddress;
	
	await Try(() => zooz.setBlockedAddress(wallets[3], true, { from: wallets[1] }));
	isBlockedAddress = await zooz.isBlockedAddress(wallets[3]);	
	assert.equal(false, isBlockedAddress);
	
	await Try(() => zooz.setBlockedAddress(wallets[1], false, { from: wallets[2] }));
	isBlockedAddress = await zooz.isBlockedAddress(wallets[1]);	
	assert.equal(true, isBlockedAddress);
	
	await Try(() => zooz.setBlockedAddress(wallets[4], true, { from: wallets[2] }));	
	isBlockedAddress = await zooz.isBlockedAddress(wallets[4]);	
	assert.equal(false, isBlockedAddress);
  });
});

async function Try(cb) {
	try {
		await cb(); 
	} 
	catch {
		
	}
}