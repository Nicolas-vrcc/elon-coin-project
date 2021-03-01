const BUSD = artifacts.require("BUSD");
const ElonCoin = artifacts.require("ElonCoin");

module.exports = async (deployer, network, [account]) => {
  let busdAddress;
  if (network == "testnet" || network == "ganache") {
    await deployer.deploy(BUSD);
    busdAddress = (await BUSD.deployed()).address;
  } else {
    busdAddress = "0xe9e7cea3dedca5984780bafc599bd69add087d56";
  }

  await deployer.deploy(ElonCoin, busdAddress, 18);
  const elonCoin = await ElonCoin.deployed();
};
