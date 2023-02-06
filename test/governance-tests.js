const ZOOZToken = artifacts.require("ZOOZToken");

contract('Set Governance addresses tests', (wallets) => {
  it('no governance addr should be set', async () => {
    const zooz = await ZOOZToken.deployed();

	assert.equal("0x0000000000000000000000000000000000000000", (await zooz.governance1Address.call()));
	assert.equal("0x0000000000000000000000000000000000000000", (await zooz.governance2Address.call()));
	assert.equal("0x0000000000000000000000000000000000000000", (await zooz.governance3Address.call()));
  });
  
  it('should not add a new governance', async () => {
    const zooz = await ZOOZToken.deployed();

	try {
		await zooz.setGovernance(wallets[1], 1, { from: wallets[9] });
	}
	catch {
		
	}
	
	assert.equal("0x0000000000000000000000000000000000000000", (await zooz.governance1Address.call()));
	assert.equal("0x0000000000000000000000000000000000000000", (await zooz.governance2Address.call()));
	assert.equal("0x0000000000000000000000000000000000000000", (await zooz.governance3Address.call()));	
  });
  
  it('should add a new governance', async () => {
    const zooz = await ZOOZToken.deployed();

	await zooz.setGovernance(wallets[1], 1);
	await zooz.setGovernance(wallets[2], 2);
	await zooz.setGovernance(wallets[3], 3);
	
	assert.equal(wallets[1], (await zooz.governance1Address.call()));
	assert.equal(wallets[2], (await zooz.governance2Address.call()));
	assert.equal(wallets[3], (await zooz.governance3Address.call()));	
  });
    
  it('should change governance', async () => {
    const zooz = await ZOOZToken.deployed();

	await zooz.setGovernance(wallets[5], 1);
	await zooz.setGovernance(wallets[6], 2);
	await zooz.setGovernance(wallets[7], 3);
	
	assert.equal(wallets[5], (await zooz.governance1Address.call()));
	assert.equal(wallets[6], (await zooz.governance2Address.call()));
	assert.equal(wallets[7], (await zooz.governance3Address.call()));	
  });
  
  it('should change governance again', async () => {
    const zooz = await ZOOZToken.deployed();

	await zooz.setGovernance(wallets[9], 2);
	
	assert.equal(wallets[5], (await zooz.governance1Address.call()));
	assert.equal(wallets[9], (await zooz.governance2Address.call()));
	assert.equal(wallets[7], (await zooz.governance3Address.call()));	
  });
  
  it('should not change governance', async () => {
    const zooz = await ZOOZToken.deployed();

	try {
		await zooz.setGovernance(wallets[1], 1, { from: wallets[9] });
	}
	catch {
		
	}
	
	assert.equal(wallets[5], (await zooz.governance1Address.call()));
	assert.equal(wallets[9], (await zooz.governance2Address.call()));
	assert.equal(wallets[7], (await zooz.governance3Address.call()));	
  });
  
  it('should not change governance after renounce Ownership', async () => {
    const zooz = await ZOOZToken.deployed();

	await zooz.renounceOwnership();

	try {
		await zooz.setGovernance(wallets[1], 2);
	}
	catch {
		
	}
	
	assert.equal(wallets[5], (await zooz.governance1Address.call()));
	assert.equal(wallets[9], (await zooz.governance2Address.call()));
	assert.equal(wallets[7], (await zooz.governance3Address.call()));	
  });
});