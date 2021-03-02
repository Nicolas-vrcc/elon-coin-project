import Web3 from "web3";
import ElonCoin from "./abi/ElonCoin.json";
import BUSDToken from "./abi/BUSD.json";

export const loadWeb3 = () => {
  if (window.ethereum || window.web3) {
    const web3 = new Web3(window.ethereum || window.web3.currentProvider);
    window.web3 = web3;
    return web3;
  } else {
    return { message: "Browser not supportted" };
  }
};

export const getAccounts = async () => {
  const [account] = await window.web3.eth.getAccounts();
  return account;
};

export const getContractInstances = async () => {
  const web3 = await loadWeb3();

  if (!web3.message) {
    const MetamaskNetwork = await web3.eth.getChainId();
    const contractNetwork = ElonCoin.networks[MetamaskNetwork];

    if (contractNetwork) {
      //ElonCoin
      const elonABI = ElonCoin.abi;
      const elonAddress = ElonCoin.networks[MetamaskNetwork].address;
      const elonInstance = await new web3.eth.Contract(elonABI, elonAddress);

      //BUSD
      const busdABI = BUSDToken.abi;
      const busdAddress = "0xe9e7cea3dedca5984780bafc599bd69add087d56";
      const busdInstance = await new web3.eth.Contract(busdABI, busdAddress);
      return [elonInstance, busdInstance, false, false];
    }
    return [{}, {}, true, false];
  }
  return [{}, {}, false, true];
};
export const connectWallet = async () => {
  const web3 = loadWeb3();
  await web3.currentProvider.enable();
};

export const addRemoveSpinner = (element, type, innerHTML, forced) => {
  if (type === "add") {
    element.attr("disabled", true);
    element.html(
      `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only"></span> ${innerHTML}`
    );
  } else {
    if (forced) element.removeAttr("disabled");
    element.html(innerHTML);
  }
};

export const estimateGas = async (trans, _from, _gasPrice) => {
  return await trans.estimateGas({ from: _from, gasPrice: _gasPrice });
};
