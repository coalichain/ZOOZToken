const WrapperZOOZToken = artifacts.require("WrapperZOOZToken");

const ONE_DAY = 3600 * 24;
const ONE_WEEK = ONE_DAY * 7;
const ONE_MONTH = ONE_DAY * 30;
const TREE_MONTH = ONE_MONTH * 3;
const HALF_YEAR = ONE_MONTH * 6;


contract('fees based on wallet timestamp tests', (wallets) => {
  it('fees should be 14%', async () => {
    const zooz = await WrapperZOOZToken.deployed();
	const now = ts(Date.now());
	
	let fees = await zooz.getFees(now);
	
	assert.equal(fees.toNumber(), 14);
  });
  
  it('fees should be 10%', async () => {
    const zooz = await WrapperZOOZToken.deployed();
	const now = ts(Date.now()) - ONE_WEEK;
	
	let fees = await zooz.getFees(now);
	
	assert.equal(fees.toNumber(), 10);
  });

  it('fees should be 5%', async () => {
    const zooz = await WrapperZOOZToken.deployed();
	const now = ts(Date.now()) - ONE_MONTH;
	
	let fees = await zooz.getFees(now);
	
	assert.equal(fees.toNumber(), 5);
  });
  
  it('fees should be 2%', async () => {
    const zooz = await WrapperZOOZToken.deployed();
	const now = ts(Date.now()) - TREE_MONTH;
	
	let fees = await zooz.getFees(now);
	
	assert.equal(fees.toNumber(), 2);
  });
  
  it('fees should be 0%', async () => {
    const zooz = await WrapperZOOZToken.deployed();
	const now = ts(Date.now()) - HALF_YEAR;
	
	let fees = await zooz.getFees(now);
	
	assert.equal(fees.toNumber(), 0);
  });
  
  it('fees should be 14%', async () => {
    const zooz = await WrapperZOOZToken.deployed();
	
	let fees = await zooz.getFees(0);
	
	assert.equal(fees.toNumber(), 14);
  });
  
  it('fees should be 14%', async () => {
    const zooz = await WrapperZOOZToken.deployed();
	const now = ts(Date.now()) + 1000;

	let fees = await zooz.getFees(now);
	
	assert.equal(fees.toNumber(), 14);
  });
});


function ts(timestamp) {
	return Math.floor(timestamp / 1000) - 100;
}