const WrapperZOOZToken = artifacts.require("WrapperZOOZToken");

contract('Set bot addresses tests', (wallets) => {
  it('should not be a bot', async () => {
    const zooz = await WrapperZOOZToken.deployed();

	let walletA_IsABot = await zooz.isItBotAddress(wallets[5]);
	let walletB_IsABot = await zooz.isItBotAddress(wallets[6]);
	
	assert.equal(false, walletA_IsABot);
	assert.equal(false, walletB_IsABot);
  });
  
  it('should be a bot', async () => {
    const zooz = await WrapperZOOZToken.deployed();

	await zooz.setGovernance(wallets[1], 1);
	await zooz.setGovernance(wallets[2], 2);
	await zooz.setGovernance(wallets[3], 3);
	
	await zooz.setBotAddress(wallets[5], true, { from: wallets[1] });
	await zooz.setBotAddress(wallets[5], true, { from: wallets[2] });
	await zooz.setBotAddress(wallets[5], true, { from: wallets[3] });
	
	let walletA_IsABot = await zooz.isItBotAddress(wallets[5]);
	let walletB_IsABot = await zooz.isItBotAddress(wallets[6]);
	
	assert.equal(true, walletA_IsABot);
	assert.equal(false, walletB_IsABot);
	
	await zooz.setBotAddress(wallets[6], false, { from: wallets[1] });
	await zooz.setBotAddress(wallets[6], false, { from: wallets[2] });
	await zooz.setBotAddress(wallets[6], false, { from: wallets[3] });

	walletA_IsABot = await zooz.isItBotAddress(wallets[5]);
	walletB_IsABot = await zooz.isItBotAddress(wallets[6]);
	
	assert.equal(true, walletA_IsABot);
	assert.equal(false, walletB_IsABot);
  });
  
  it('should be a bot too', async () => {
    const zooz = await WrapperZOOZToken.deployed();

	await zooz.setBotAddress(wallets[5], false, { from: wallets[1] });
	await zooz.setBotAddress(wallets[5], false, { from: wallets[2] });
	await zooz.setBotAddress(wallets[5], false, { from: wallets[3] });

	let walletA_IsABot = await zooz.isItBotAddress(wallets[5]);
	let walletB_IsABot = await zooz.isItBotAddress(wallets[6]);
	
	assert.equal(false, walletA_IsABot);
	assert.equal(false, walletB_IsABot);
	
	await zooz.setBotAddress(wallets[6], true, { from: wallets[1] });
	await zooz.setBotAddress(wallets[6], true, { from: wallets[2] });
	await zooz.setBotAddress(wallets[6], true, { from: wallets[3] });
	
	walletA_IsABot = await zooz.isItBotAddress(wallets[5]);
	walletB_IsABot = await zooz.isItBotAddress(wallets[6]);
	
	assert.equal(false, walletA_IsABot);
	assert.equal(true, walletB_IsABot);
  });
  
  it('should not be able to change bot address', async () => {
    const zooz = await WrapperZOOZToken.deployed();	
	let isItBotAddress;
	
	await Try(() => zooz.setBotAddress(wallets[5], true, { from: wallets[7] }));
	isItBotAddress = await zooz.isItBotAddress(wallets[5]);	
	assert.equal(false, isItBotAddress);
	
	await Try(() => zooz.setBotAddress(wallets[6], false, { from: wallets[8] }));
	isItBotAddress = await zooz.isItBotAddress(wallets[6]);	
	assert.equal(true, isItBotAddress);
	
	await Try(() => zooz.setBotAddress(wallets[4], true, { from: wallets[9] }));	
	isItBotAddress = await zooz.isItBotAddress(wallets[4]);	
	assert.equal(false, isItBotAddress);
  });
  
  it('should be a bot too, after renounce Ownership', async () => {
    const zooz = await WrapperZOOZToken.deployed();

	await zooz.renounceOwnership();

	await zooz.setBotAddress(wallets[5], true, { from: wallets[1] });
	await zooz.setBotAddress(wallets[5], true, { from: wallets[2] });
	await zooz.setBotAddress(wallets[5], true, { from: wallets[3] });

	let walletA_IsABot = await zooz.isItBotAddress(wallets[5]);
	let walletB_IsABot = await zooz.isItBotAddress(wallets[6]);
	
	assert.equal(true, walletA_IsABot);
	assert.equal(true, walletB_IsABot);
	
	await zooz.setBotAddress(wallets[6], false, { from: wallets[1] });
	await zooz.setBotAddress(wallets[6], false, { from: wallets[2] });
	await zooz.setBotAddress(wallets[6], false, { from: wallets[3] });
	
	walletA_IsABot = await zooz.isItBotAddress(wallets[5]);
	walletB_IsABot = await zooz.isItBotAddress(wallets[6]);
	
	assert.equal(true, walletA_IsABot);
	assert.equal(false, walletB_IsABot);
  });
  
  it('should not be a bot, if missing governance ', async () => {
    const zooz = await WrapperZOOZToken.deployed();

	await zooz.setBotAddress(wallets[7], true, { from: wallets[1] });
	await zooz.setBotAddress(wallets[7], true, { from: wallets[3] });

	let walletA_IsABot = await zooz.isItBotAddress(wallets[7]);
	assert.equal(false, walletA_IsABot);
	
	await zooz.setBotAddress(wallets[7], true, { from: wallets[2] });
	
	walletA_IsABot = await zooz.isItBotAddress(wallets[7]);
	assert.equal(true, walletA_IsABot);
  });
});

async function Try(cb) {
	try {
		await cb(); 
	} 
	catch {
		
	}
}