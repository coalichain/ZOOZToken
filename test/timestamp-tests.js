const WrapperZOOZToken = artifacts.require("WrapperZOOZToken");

function pause(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
	
contract('timestamp on receive and send transaction tests', (wallets) => {
  it('timestamp should be changed for sender and recipient', async () => {
    const zooz = await WrapperZOOZToken.deployed();

	let walletA = await zooz.timestampOf(wallets[0]);
	let walletB = await zooz.timestampOf(wallets[1]);
	let walletAtimestamp = walletA.toNumber();

	await pause(1000);
	await zooz.holdDateHook(wallets[0], wallets[1]);
	
	walletA = await zooz.timestampOf(wallets[0]);
	walletB = await zooz.timestampOf(wallets[1]);

	assert.notEqual(0, walletA.toNumber(),  "timestamp should be not equal to 0");
	assert.notEqual(walletAtimestamp, walletA.toNumber(),  "timestamp should be changed");
	assert.notEqual(0, walletB.toNumber(),  "timestamp should be changed");
  });
  
  it('timestamp should be changed for sender only', async () => {
    const zooz = await WrapperZOOZToken.deployed();

	let walletA = await zooz.timestampOf(wallets[0]);
	let walletB = await zooz.timestampOf(wallets[1]);
	let walletAtimestamp = walletA.toNumber();
	let walletBtimestamp = walletB.toNumber();

	await pause(1000);
	await zooz.holdDateHook(wallets[0], wallets[1]);
	
	walletA = await zooz.timestampOf(wallets[0]);
	walletB = await zooz.timestampOf(wallets[1]);

	assert.notEqual(0, walletA.toNumber(),  "timestamp should be not equal to 0");
	assert.notEqual(walletAtimestamp, walletA.toNumber(),  "timestamp should be changed");
	assert.equal(walletBtimestamp, walletB.toNumber(),  "timestamp shouldn't be changed");
  });
  
  it('timestamp should be changed for sender only', async () => {
    const zooz = await WrapperZOOZToken.deployed();

	let walletA = await zooz.timestampOf(wallets[0]);
	let walletB = await zooz.timestampOf(wallets[1]);
	let walletAtimestamp = walletA.toNumber();
	let walletBtimestamp = walletB.toNumber();

	await pause(1000);
	await zooz.holdDateHook(wallets[1], wallets[0]);
	
	walletB = await zooz.timestampOf(wallets[1]);
	walletA = await zooz.timestampOf(wallets[0]);

	assert.notEqual(0, walletB.toNumber(),  "timestamp should be not equal to 0");
	assert.notEqual(walletBtimestamp, walletB.toNumber(),  "timestamp should be changed");
	assert.equal(walletAtimestamp, walletA.toNumber(),  "timestamp shouldn't be changed");
  });
});
