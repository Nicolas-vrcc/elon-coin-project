const BUSD = artifacts.require("BUSD");
const ElonCoin = artifacts.require("ElonCoin");

module.exports = async (deployer) => {
  // await deployer.deploy(BUSD)
  const busdToken = await BUSD.deployed();

  await deployer.deploy(ElonCoin, busdToken.address, 18);
  const ElonCoin = await ElonCoin.deployed();

  // await deployer.deploy(Dividend, elonCoin.address, presale.address)
  // const dividend = await Dividend.deployed()
};
