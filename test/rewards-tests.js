const ZOOZToken = artifacts.require("ZOOZToken");
const WrapperZOOZToken = artifacts.require("WrapperZOOZToken");

contract('Set rewards and manager addresses tests', (wallets) => {
  it('rewards addresse should be equal to zero address', async () => {
    const zooz = await ZOOZToken.deployed();	
	assert.equal("0x0000000000000000000000000000000000000000", (await zooz.rewardsAddress.call()));
  });
  
  it('manager addresse should be equal to zero address', async () => {
    const zooz = await ZOOZToken.deployed();	
	assert.equal("0x0000000000000000000000000000000000000000", (await zooz.managerAddress.call()));
  });
  
  it('rewards addresse should be changed', async () => {
    const zooz = await ZOOZToken.deployed();

	await zooz.setRewardsTeamAddress("0x531992572dD16503cBb83F16B1aD9b0507Cc8f50");

	let rewardsAddress = await zooz.rewardsAddress.call();
	let managerAddress = await zooz.managerAddress.call();
	
	assert.equal("0x531992572dD16503cBb83F16B1aD9b0507Cc8f50", rewardsAddress);
	assert.equal("0x0000000000000000000000000000000000000000", managerAddress);
  });
  
  it('manager addresse should be changed', async () => {
    const zooz = await ZOOZToken.deployed();

	await zooz.setManagerAddress("0x531992572dD16503cBb83F16B1aD9b0507Cc8f50");

	let rewardsAddress = await zooz.rewardsAddress.call();
	let managerAddress = await zooz.managerAddress.call();
	
	assert.equal("0x531992572dD16503cBb83F16B1aD9b0507Cc8f50", rewardsAddress);
	assert.equal("0x531992572dD16503cBb83F16B1aD9b0507Cc8f50", managerAddress);
  });
  
  it('rewards and manager addresse should be changed', async () => {
    const zooz = await ZOOZToken.deployed();

	await zooz.setRewardsTeamAddress("0x0000000000000000000000000000000000000000");
	await zooz.setManagerAddress("0x0000000000000000000000000000000000000000");

	let rewardsAddress = await zooz.rewardsAddress.call();
	let managerAddress = await zooz.managerAddress.call();
	
	assert.equal("0x0000000000000000000000000000000000000000", rewardsAddress);
	assert.equal("0x0000000000000000000000000000000000000000", managerAddress);
  });

  it('manager should be able to change pair, bot and blocked', async () => {
    const zooz = await WrapperZOOZToken.deployed();

	await zooz.setManagerAddress(wallets[5]);
	
	await zooz.setGovernance(wallets[9], 1);
	await zooz.setGovernance(wallets[8], 2);
	await zooz.setGovernance(wallets[7], 3);

	let managerAddress = await zooz.managerAddress.call();
	
	assert.equal(wallets[5], managerAddress);
	
	await zooz.setBot(wallets[3], true, { from: wallets[9] });
	await zooz.setBot(wallets[3], true, { from: wallets[8] });
	await zooz.setBot(wallets[3], true, { from: wallets[7] });

	await zooz.setBlocked(wallets[3], true, { from: wallets[9] });
	await zooz.setBlocked(wallets[3], true, { from: wallets[8] });
	await zooz.setBlocked(wallets[3], true, { from: wallets[7] });

	await zooz.setPair(wallets[3], true, { from: wallets[5] });
	
	let isPair = await zooz.getPair(wallets[3]);	
	let isBlocked = await zooz.isBlocked(wallets[3]);	
	let isBot = await zooz.isBot(wallets[3]);	
	
	assert.equal(true, isPair);
	assert.equal(true, isBlocked);
	assert.equal(true, isBot);
	
	await zooz.setBot(wallets[3], false, { from: wallets[9] });
	await zooz.setBlocked(wallets[3], false, { from: wallets[8] });
	await zooz.setPair(wallets[3], false, { from: wallets[5] });
	
	isPair = await zooz.getPair(wallets[3]);	
	isBlocked = await zooz.isBlocked(wallets[3]);	
	isBot = await zooz.isBot(wallets[3]);	
	
	assert.equal(false, isPair);
	assert.equal(false, isBlocked);
	assert.equal(false, isBot);
  });
  
  it('manager should not be able to change pair', async () => {
    const zooz = await WrapperZOOZToken.deployed();

	await zooz.setManagerAddress(wallets[6]);
	let managerAddress = await zooz.managerAddress.call();
	
	assert.equal(wallets[6], managerAddress);
	
	await Try(() => zooz.setPair(wallets[3], true, { from: wallets[5] }));
	
	let isPair = await zooz.getPair(wallets[3]);	
	
	assert.equal(false, isPair);
  });
  
  it('manager should be able to change pair, after renounce Ownership', async () => {
    const zooz = await WrapperZOOZToken.deployed();

	await zooz.renounceOwnership();
	await zooz.setManagerAddress(wallets[5], { from: wallets[6] });
	let managerAddress = await zooz.managerAddress.call();
	
	assert.equal(wallets[5], managerAddress);

	await zooz.setPair(wallets[2], true, { from: wallets[5] });
	
	let isPair = await zooz.getPair(wallets[2]);	
	
	assert.equal(true, isPair);
	
	await zooz.setPair(wallets[2], false, { from: wallets[5] });
	
	isPair = await zooz.getPair(wallets[3]);	
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