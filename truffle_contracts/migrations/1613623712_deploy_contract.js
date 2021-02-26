const BUSD = artifacts.require("BUSD");
const ElonCoinWithPresale = artifacts.require("ElonCoinWithPresale");
const Dividend = artifacts.require("Dividend");

module.exports = async (deployer) => {
  // await deployer.deploy(BUSD)
  const busdToken = await BUSD.deployed();

  await deployer.deploy(ElonCoinWithPresale, busdToken.address, 18);
  const elonCoinWithPresale = await ElonCoinWithPresale.deployed();

  // await deployer.deploy(Dividend, elonCoin.address, presale.address)
  // const dividend = await Dividend.deployed()
};
