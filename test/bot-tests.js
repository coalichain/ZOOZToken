const WrapperZOOZToken = artifacts.require("WrapperZOOZToken");

contract('Set bot addresses tests', (wallets) => {
  it('should not be a bot', async () => {
    const zooz = await WrapperZOOZToken.deployed();

	let walletA_IsABot = await zooz.getBot(wallets[0]);
	let walletB_IsABot = await zooz.getBot(wallets[1]);
	
	assert.equal(false, walletA_IsABot);
	assert.equal(false, walletB_IsABot);
  });
  
  it('should be a bot', async () => {
    const zooz = await WrapperZOOZToken.deployed();

	await zooz.setBot(wallets[0], true);
	let walletA_IsABot = await zooz.getBot(wallets[0]);
	let walletB_IsABot = await zooz.getBot(wallets[1]);
	
	assert.equal(true, walletA_IsABot);
	assert.equal(false, walletB_IsABot);
	
	await zooz.setBot(wallets[1], false);
	walletA_IsABot = await zooz.getBot(wallets[0]);
	walletB_IsABot = await zooz.getBot(wallets[1]);
	
	assert.equal(true, walletA_IsABot);
	assert.equal(false, walletB_IsABot);
  });
  
  it('should be a bot too', async () => {
    const zooz = await WrapperZOOZToken.deployed();

	await zooz.setBot(wallets[0], false);
	let walletA_IsABot = await zooz.getBot(wallets[0]);
	let walletB_IsABot = await zooz.getBot(wallets[1]);
	
	assert.equal(false, walletA_IsABot);
	assert.equal(false, walletB_IsABot);
	
	await zooz.setBot(wallets[1], true);
	walletA_IsABot = await zooz.getBot(wallets[0]);
	walletB_IsABot = await zooz.getBot(wallets[1]);
	
	assert.equal(false, walletA_IsABot);
	assert.equal(true, walletB_IsABot);
  });
  
  it('should not be able to change bot address', async () => {
    const zooz = await WrapperZOOZToken.deployed();	
	let isBot;
	
	await Try(() => zooz.setBot(wallets[0], true, { from: wallets[1] }));
	isBot = await zooz.getBot(wallets[0]);	
	assert.equal(false, isBot);
	
	await Try(() => zooz.setBot(wallets[1], false, { from: wallets[1] }));
	isBot = await zooz.getBot(wallets[1]);	
	assert.equal(true, isBot);
	
	await Try(() => zooz.setBot(wallets[2], true, { from: wallets[1] }));	
	isBot = await zooz.getBot(wallets[2]);	
	assert.equal(false, isBot);
  });
});

async function Try(cb) {
	try {
		await cb(); 
	} 
	catch {
		
	}
}