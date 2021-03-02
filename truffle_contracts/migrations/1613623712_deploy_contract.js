const BUSD = artifacts.require("BUSD");
const ElonCoin = artifacts.require("ElonCoin");

module.exports = async (deployer, network, [account]) => {
  await deployer.deploy(
    ElonCoin,
    "0xe9e7cea3dedca5984780bafc599bd69add087d56", //BUSD MAINNET
    18
  );
};
