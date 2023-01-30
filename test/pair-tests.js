const WrapperZOOZToken = artifacts.require("WrapperZOOZToken");

contract('Set pair addresses tests', (wallets) => {
  it('should not be a pair', async () => {
    const zooz = await WrapperZOOZToken.deployed();

	let walletA_IsAPair = await zooz.getPair(wallets[0]);
	let walletB_IsAPair = await zooz.getPair(wallets[1]);
	
	assert.equal(false, walletA_IsAPair);
	assert.equal(false, walletB_IsAPair);
  });
  
  it('should be a pair', async () => {
    const zooz = await WrapperZOOZToken.deployed();

	await zooz.setPair(wallets[0], true);
	let walletA_IsAPair = await zooz.getPair(wallets[0]);
	let walletB_IsAPair = await zooz.getPair(wallets[1]);
	
	assert.equal(true, walletA_IsAPair);
	assert.equal(false, walletB_IsAPair);
	
	await zooz.setPair(wallets[1], false);
	walletA_IsAPair = await zooz.getPair(wallets[0]);
	walletB_IsAPair = await zooz.getPair(wallets[1]);
	
	assert.equal(true, walletA_IsAPair);
	assert.equal(false, walletB_IsAPair);
  });
  
  it('should be a pair too', async () => {
    const zooz = await WrapperZOOZToken.deployed();

	await zooz.setPair(wallets[0], false);
	let walletA_IsAPair = await zooz.getPair(wallets[0]);
	let walletB_IsAPair = await zooz.getPair(wallets[1]);
	
	assert.equal(false, walletA_IsAPair);
	assert.equal(false, walletB_IsAPair);
	
	await zooz.setPair(wallets[1], true);
	walletA_IsAPair = await zooz.getPair(wallets[0]);
	walletB_IsAPair = await zooz.getPair(wallets[1]);
	
	assert.equal(false, walletA_IsAPair);
	assert.equal(true, walletB_IsAPair);
  });
  
  it('should not be able to change a pair', async () => {
    const zooz = await WrapperZOOZToken.deployed();	
	let isPair;
	
	await Try(() => zooz.setPair(wallets[0], true, { from: wallets[1] }));
	isPair = await zooz.getPair(wallets[0]);	
	assert.equal(false, isPair);
	
	await Try(() => zooz.setPair(wallets[1], false, { from: wallets[1] }));
	isPair = await zooz.getPair(wallets[1]);	
	assert.equal(true, isPair);
	
	await Try(() => zooz.setPair(wallets[2], true, { from: wallets[1] }));	
	isPair = await zooz.getPair(wallets[2]);	
	assert.equal(false, isPair);
  });
});

async function Try(cb) {
	try {
		await cb(); 
	} 
	catch {
		
	}
}