import React, { useState, useEffect } from "react";
import "./Presale.css";
import $ from "jquery";
import Widget from "./Widget";
import { addRemoveSpinner, estimateGas } from "../../funcs";
import Swal from "sweetalert2";

const Presale = (props) => {
  const [busdBalance, setBusdBalance] = useState(0);
  const [busd, setBusd] = useState("");
  const [elonBalance, setElonBalance] = useState(0);
  const [elon, setElon] = useState("");
  const [reRender, setReRender] = useState(false);
  const [now, setNow] = useState(0);

  $(".busdmax").click(() => {
    setBusd(busdBalance);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // Get current allowance
    const allowance = async () => {
      if (props.connected.status) {
        if (!props.networkError) {
          const elonCtr = props.instances.elon._address;
          const all = await props.instances.busd.methods
            .allowance(props.connected.address, elonCtr)
            .call();
          if (+busd * 1e18 <= +all) {
            $("#appr").attr("disabled", true);
            $("#buy").removeAttr("disabled");
          } else {
            $("#appr").removeAttr("disabled");
            $("#buy").attr("disabled", true);
          }
        }
      }
    };
    allowance();
    // update ELon field
    BusdToElon(busd);
  }, [busd]);
  useEffect(() => {
    const fetch = async () => {
      if (props.connected.status) {
        if (!props.networkError) {
          const busdBal = await props.instances.busd.methods
            .balanceOf(props.connected.address)
            .call();
          const elonBal = await props.instances.elon.methods
            .balanceOf(props.connected.address)
            .call();

          setBusdBalance(busdBal / 1e18);
          setElonBalance(elonBal / 1e18);
        }
      }
    };
    fetch();
  }, [props.connected.status, props.connected.address, reRender]);

  useEffect(() => {
    const s = async () => {
      if (props.connected.status) {
        if (!props.networkError) {
          window.claim = () =>
            props.instances.elon.methods
              .claimDividend()
              .send({ from: props.connected.address });
        }
      }
    };
    s();
  });

  // Approve contract to spend BUSD
  const approve = async (e) => {
    const amount = window.web3.utils.toWei(busd);
    addRemoveSpinner($(e.target), "add", "Approving");
    const approveCall = props.instances.busd.methods.approve(
      props.instances.elon._address,
      amount
    );
    const gasPrice = await window.web3.eth.getGasPrice();
    const gas = await estimateGas(
      approveCall,
      props.connected.address,
      gasPrice
    );

    await approveCall
      .send({ from: props.connected.address, gasPrice: gasPrice, gas: gas })
      .then((e) => {
        addRemoveSpinner($("#appr"), "remove", "Approve");
        addRemoveSpinner($("#buy"), "remove", "Buy", true);
      })
      .catch((e) => {
        Swal.fire({
          title: "Error!",
          text: e.message,
          icon: "error",
          confirmButtonText: "Close",
        });
        addRemoveSpinner($("#appr"), "remove", "Approve", true);
      });
  };

  const buy = async (e) => {
    const amount = window.web3.utils.toWei(busd);
    addRemoveSpinner($("#buy"), "add", "Buying");

    const buyCall = props.instances.elon.methods.buyTokens(
      props.connected.address,
      amount
    );
    const gasPrice = await window.web3.eth.getGasPrice();
    const gas = await estimateGas(buyCall, props.connected.address, gasPrice);

    await buyCall
      .send({ from: props.connected.address, gasPrice: gasPrice, gas: gas })
      .then((e) => {
        Swal.fire({
          title: "Success!",
          text: "Transaction Completed",
          icon: "success",
          confirmButtonText: "OK",
        });
        setReRender(!reRender);
        addRemoveSpinner($("#buy"), "remove", "Buy");
        addRemoveSpinner($("#appr"), "remove", "Approve", true);
      })
      .catch((e) => {
        Swal.fire({
          title: "Error!",
          text: e.message,
          icon: "error",
          confirmButtonText: "Close",
        });
        addRemoveSpinner($("#buy"), "remove", "Buy", true);
      });
  };

  let button;

  if (props.connected.status) {
    if (props.networkError) {
      button = (
        <button id="swap-button" className="wrong-network">
          <div className="swap-button-text">Wrong Network</div>
        </button>
      );
    } else {
      if (+busd <= 0) {
        button = (
          <button id="swap-button" disabled>
            <div className="swap-button-text">Please Enter a Valid Amount</div>
          </button>
        );
      } else if (+busd > 0 && +busd < 4) {
        button = (
          <button id="swap-button" disabled>
            <div className="swap-button-text">Minimum Purchase is 4 BUSD</div>
          </button>
        );
      } else if (+busd > busdBalance) {
        button = (
          <button id="swap-button" disabled>
            <div className="swap-button-text">Issuficient Balance</div>
          </button>
        );
      } else {
        button = (
          <div className="d-flex justify-content-between .btn-wrap ml-3 mr-3">
            <button id="appr" className="inside-button" onClick={approve}>
              Approve
            </button>
            <button id="buy" className="inside-button" onClick={buy}>
              Buy
            </button>
          </div>
        );
      }
    }
  } else {
    
      button = (
        <button
          id="swap-button"
          className="connect"
          onClick={(e) => props.triggerPopup(true)}
        >
          <div className="swap-button-text">Connect Wallet</div>
        </button>
      );
  }

  const onBusdChange = (e) => {
    const amount = e.target.value;
    setBusd(amount);
    BusdToElon(amount);
  };
  const onElonChange = (e) => {
    const amount = e.target.value;
    setElon(amount);
    ElonToBusd(amount);
  };
  const ElonToBusd = (elon) => {
    const busdEquivalent = elon * 4;
    setBusd(busdEquivalent);
  };
  const BusdToElon = (busd) => {
    const elonEquivalent = busd / 4;
    setElon(elonEquivalent);
  };

  const stringifyTime = (timestamp) => {
    let days = timestamp / (1000 * 3600 * 24);
    let hours = days * 24;
    let minutes = hours * 60;
    let seconds = minutes * 60;

    days = days.toString().split(".")[0];
    hours = (hours % 24).toString().split(".")[0];
    minutes = (minutes % 60).toString().split(".")[0];
    seconds = (seconds % 60).toString().split(".")[0];

    return `${days}:${hours}:${minutes}:${seconds}`
      .split(":")
      .map((e) => `0${e}`.slice(-2))
      .join(":");
  };
  const arrangeTime = (timestamp) => {
    const start = timestamp.start * 1000;
    const end = timestamp.end * 1000;
    if (now < start) {
      const timeLeft = start - now;
      return { time: stringifyTime(timeLeft), state: "not_started" };
    } else {
      if (now < end) {
        const timeLeft = end - now;
        return { time: stringifyTime(timeLeft), state: "ongoing" };
      } else {
        const timeLeft = now - end;
        return { time: stringifyTime(timeLeft), state: "ended" };
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="desktop col-sm mt-auto img">
          <img src="side.png" alt=""></img>
        </div>
        <div className="col-sm">
          <Widget
            busdBalance={busdBalance}
            tkn={props.tokensLeft}
            tl={arrangeTime(props.timeLeft)}
            busd={busd}
            onBusdChange={onBusdChange}
            onElonChange={onElonChange}
            button={button}
            elon={elon}
            elonBalance={elonBalance}
          />
        </div>
      </div>
    </div>
  );
};

export default Presale;
