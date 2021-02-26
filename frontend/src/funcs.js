import Web3 from "web3";
import ElonCoinWithPresale from "./abi/ElonCoinWithPresale.json";
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

function drawPieSlice(
  ctx,
  centerX,
  centerY,
  radius,
  startAngle,
  endAngle,
  color
) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.closePath();
  ctx.fill();
}
export var Piechart = function (options) {
  this.options = options;
  this.canvas = options.canvas;
  this.ctx = this.canvas.getContext("2d");
  this.colors = options.colors;

  this.draw = function () {
    var total_value = 0;
    var color_index = 0;
    for (var categ in this.options.data) {
      var val = this.options.data[categ];
      total_value += val;
    }

    var start_angle = 0;
    for (categ in this.options.data) {
      val = this.options.data[categ];
      var slice_angle = (2 * Math.PI * val) / total_value;

      drawPieSlice(
        this.ctx,
        this.canvas.width / 2,
        this.canvas.height / 2,
        Math.min(this.canvas.width / 2, this.canvas.height / 2),
        start_angle,
        start_angle + slice_angle,
        this.colors[color_index % this.colors.length]
      );

      start_angle += slice_angle;
      color_index++;
    }
  };
};

export const getAccounts = async () => {
  const [account] = await window.web3.eth.getAccounts();
  return account;
};

export const getContractInstances = async () => {
  const web3 = await loadWeb3();

  if (!web3.message) {
    const MetamaskNetwork = await web3.eth.getChainId();
    const contractNetwork = ElonCoinWithPresale.networks[MetamaskNetwork];

    if (contractNetwork) {
      //ElonCoin
      const elonABI = ElonCoinWithPresale.abi;
      const elonAddress = ElonCoinWithPresale.networks[MetamaskNetwork].address;
      const elonInstance = await new web3.eth.Contract(elonABI, elonAddress);

      //BUSD
      const busdABI = BUSDToken.abi;
      const busdAddress = BUSDToken.networks[MetamaskNetwork].address;
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
      `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">${innerHTML}LOADING...</span>`
    );
  } else {
    if (forced) element.removeAttr("disabled");
    element.html(innerHTML);
  }
};

export const estimateGas = async (trans, _from, _gasPrice) => {
  return await trans.estimateGas({ from: _from, gasPrice: _gasPrice });
};
