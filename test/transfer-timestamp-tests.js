const ZOOZToken = artifacts.require("ZOOZToken");

function pause(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

contract('Transfer and timestamp tests', (wallets) => {
  it('timestamp should be changed for sender and recipient', async () => {
    const zooz = await ZOOZToken.deployed();

	let timestampA = await zooz.timestampOf(wallets[0]);
	let timestampB = await zooz.timestampOf(wallets[1]);
	let timestampC = await zooz.timestampOf(wallets[2]);

	assert.notEqual(timestampA.toNumber(), 0);
	assert.equal(timestampB.toNumber(), 0);
	assert.equal(timestampC.toNumber(), 0);
	
	await pause(1000);

	await zooz.transfer(wallets[1], "50000", { from: wallets[0] }); 
	await zooz.transfer(wallets[2], "50000", { from: wallets[0] }); 

	let ntimestampA = await zooz.timestampOf(wallets[0]);
	let ntimestampB = await zooz.timestampOf(wallets[1]);
	let ntimestampC = await zooz.timestampOf(wallets[2]);
	
	assert.notEqual(ntimestampA.toNumber(), 0);
	assert.notEqual(ntimestampB.toNumber(), 0);
	assert.notEqual(ntimestampC.toNumber(), 0);
	assert.notEqual(timestampA.toNumber(), ntimestampA.toNumber());
	assert.notEqual(timestampB.toNumber(), ntimestampB.toNumber());
	assert.notEqual(timestampC.toNumber(), ntimestampC.toNumber());
  });
  
  it('timestamp should be changed for sender only', async () => {
    const zooz = await ZOOZToken.deployed();

	let timestampA = await zooz.timestampOf(wallets[0]);
	let timestampB = await zooz.timestampOf(wallets[1]);
	let timestampC = await zooz.timestampOf(wallets[2]);

	assert.notEqual(timestampA.toNumber(), 0);
	assert.notEqual(timestampB.toNumber(), 0);
	assert.notEqual(timestampC.toNumber(), 0);
	
	await pause(1000);

	await zooz.transfer(wallets[1], "50000", { from: wallets[0] }); 
	await zooz.transfer(wallets[2], "50000", { from: wallets[0] }); 

	let ntimestampA = await zooz.timestampOf(wallets[0]);
	let ntimestampB = await zooz.timestampOf(wallets[1]);
	let ntimestampC = await zooz.timestampOf(wallets[2]);
	
	assert.notEqual(ntimestampA.toNumber(), 0);
	assert.notEqual(ntimestampB.toNumber(), 0);
	assert.notEqual(ntimestampC.toNumber(), 0);
	assert.notEqual(timestampA.toNumber(), ntimestampA.toNumber());
	assert.equal(timestampB.toNumber(), ntimestampB.toNumber());
	assert.equal(timestampC.toNumber(), ntimestampC.toNumber());
  });
  
  it('timestamp should be changed for sender only', async () => {
    const zooz = await ZOOZToken.deployed();

	let timestampB = await zooz.timestampOf(wallets[1]);
	let timestampC = await zooz.timestampOf(wallets[2]);

	assert.notEqual(timestampB.toNumber(), 0);
	assert.notEqual(timestampC.toNumber(), 0);
	
	await pause(1000);

	await zooz.transfer(wallets[2], "50000", { from: wallets[1] }); 

	let ntimestampB = await zooz.timestampOf(wallets[1]);
	let ntimestampC = await zooz.timestampOf(wallets[2]);
	
	assert.notEqual(ntimestampB.toNumber(), 0);
	assert.notEqual(ntimestampC.toNumber(), 0);
	assert.notEqual(timestampB.toNumber(), ntimestampB.toNumber());
	assert.equal(timestampC.toNumber(), ntimestampC.toNumber());
  });
});