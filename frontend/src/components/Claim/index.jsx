import React, { useEffect, useState } from "react";
import "./claim.css";
import { addRemoveSpinner, estimateGas } from "../../funcs";
import $ from "jquery";
import Swal from "sweetalert2";

const Claim = (props) => {
  const [dividend, setDividend] = useState(0);
  const [reRender, setReRender] = useState(false);
  const [claimable, setClaimable] = useState(false);
  const [noDiv, setNoDiv] = useState(false);

  useEffect(() => {
    const effect = async () => {
      if (props.connected.status) {
        if (!props.networkError) {
          const _div = await props.elon.methods
            .calculateDividends(props.connected.address)
            .call();
          const balance = await props.elon.methods
            .balanceOf(props.connected.address)
            .call();
          setClaimable(+balance > 0);
          setNoDiv(+_div <= 0);
          setDividend(+_div / 1e18);
        }
      }
    };
    effect();
  }, [props.elon, reRender, props.connected.address, props.connected.status]);

  const claim = async (e) => {
    const btn = e.target;
    addRemoveSpinner($(btn), "add", "Claiming");

    const claimCall = props.elon.methods.claimDividend();

    await claimCall
      .send({ from: props.connected.address })
      .then((e) => {
        Swal.fire({
          title: "Success!",
          text: "Dividend Claimed",
          icon: "success",
          confirmButtonText: "OK",
        });
        setReRender(!reRender);
        addRemoveSpinner($(btn), "remove", "Claim Divivdend");
      })
      .catch((e) => {
        Swal.fire({
          title: "Error!",
          text: e.message.includes("signature")
            ? e.message
            : "A revert occured",
          icon: "error",
          confirmButtonText: "Close",
        });
        addRemoveSpinner($(btn), "remove", "Claim Dividend", true);
      });
  };

  return (
    <div className="container">
      <div className="vertical text-center">
        <h1 style={{ fontSize: "100%", fontWeight: "bold" }}>
          ONLY HOLDERS CAN CLAIM DIVIDENDS
        </h1>
        <br></br>
        <div>Your Dividends : {dividend} ELON</div>

        {props.connected.status ? (
          props.networkError ? (
            <button className="btn btn-danger" disabled>
              Wrong Network
            </button>
          ) : claimable ? (
            noDiv ? (
              <>
                <button className="btn btn-outline-danger" disabled>
                  No Dividend
                </button>
                <br></br>
                <p className="text-danger">
                  <b>0 Token found in dividend</b>
                </p>
              </>
            ) : (
              <button className="btn btn-outline-primary" onClick={claim}>
                Claim Dividend
              </button>
            )
          ) : (
            <>
              <button className="btn btn-outline-primary" disabled>
                Claim Dividend
              </button>
              <br></br>
              <p className="text-danger">
                <b>you are not a holder</b>
              </p>
            </>
          )
        ) : (
          <button
            className="btn btn-outline-primary"
            onClick={(e) => {
              e.preventDefault();
              props.triggerPopup(true);
            }}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default Claim;
