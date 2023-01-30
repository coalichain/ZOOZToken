const WrapperZOOZToken = artifacts.require("WrapperZOOZToken");

contract('Set Blocked addresses tests', (wallets) => {
  it('should not be blocked', async () => {
    const zooz = await WrapperZOOZToken.deployed();

	let walletA_IsBlocked = await zooz.getBlocked(wallets[0]);
	let walletB_IsBlocked = await zooz.getBlocked(wallets[1]);
	
	assert.equal(false, walletA_IsBlocked);
	assert.equal(false, walletB_IsBlocked);
  });
  
  it('should be blocked', async () => {
    const zooz = await WrapperZOOZToken.deployed();

	await zooz.setBlocked(wallets[0], true);
	let walletA_IsBlocked = await zooz.getBlocked(wallets[0]);
	let walletB_IsBlocked = await zooz.getBlocked(wallets[1]);
	
	assert.equal(true, walletA_IsBlocked);
	assert.equal(false, walletB_IsBlocked);
	
	await zooz.setBlocked(wallets[1], false);
	walletA_IsBlocked = await zooz.getBlocked(wallets[0]);
	walletB_IsBlocked = await zooz.getBlocked(wallets[1]);
	
	assert.equal(true, walletA_IsBlocked);
	assert.equal(false, walletB_IsBlocked);
  });
  
  it('should be blocked too', async () => {
    const zooz = await WrapperZOOZToken.deployed();

	await zooz.setBlocked(wallets[0], false);
	let walletA_IsBlocked = await zooz.getBlocked(wallets[0]);
	let walletB_IsBlocked = await zooz.getBlocked(wallets[1]);
	
	assert.equal(false, walletA_IsBlocked);
	assert.equal(false, walletB_IsBlocked);
	
	await zooz.setBlocked(wallets[1], true);
	walletA_IsBlocked = await zooz.getBlocked(wallets[0]);
	walletB_IsBlocked = await zooz.getBlocked(wallets[1]);
	
	assert.equal(false, walletA_IsBlocked);
	assert.equal(true, walletB_IsBlocked);
  });
  
  it('should not be able to change blocked address', async () => {
    const zooz = await WrapperZOOZToken.deployed();	
	let isBlocked;
	
	await Try(() => zooz.setBlocked(wallets[0], true, { from: wallets[1] }));
	isBlocked = await zooz.getBlocked(wallets[0]);	
	assert.equal(false, isBlocked);
	
	await Try(() => zooz.setBlocked(wallets[1], false, { from: wallets[1] }));
	isBlocked = await zooz.getBlocked(wallets[1]);	
	assert.equal(true, isBlocked);
	
	await Try(() => zooz.setBlocked(wallets[2], true, { from: wallets[1] }));	
	isBlocked = await zooz.getBlocked(wallets[2]);	
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