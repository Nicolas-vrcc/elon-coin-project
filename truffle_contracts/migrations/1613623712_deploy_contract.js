const BUSD = artifacts.require("BUSD");
const ElonCoin = artifacts.require("ElonCoin");
const Presale = artifacts.require("Presale");
const Dividend = artifacts.require("Dividend");

module.exports = async deployer => {

  await deployer.deploy(BUSD)
  const busdToken = await BUSD.deployed()
  
  await deployer.deploy(ElonCoin)
  const elonCoin = await ElonCoin.deployed()
  
  await deployer.deploy(Presale, elonCoin.address, busdToken.address)
  const presale = await Presale.deployed()

  await elonCoin.updatePresaleAddress(presale.address)

  await deployer.deploy(Dividend, elonCoin.address, presale.address)
  const dividend = await Dividend.deployed()
};
