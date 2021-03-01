import React, { useEffect, useState } from "react";
import "./refund.css";
import { claimDiv } from "../../funcs";

const Claim = (props) => {
  const [elonInstance, _] = useState();
  const [dividend, setDividend] = useState("0");

  useEffect(() => {}, []);

  useEffect(() => {
    const effect = async () => {
      if (props.connected.status) {
        if (!props.networkError) {
          const _div = await elonInstance.methods
            .calculateDividends(props.connected.address)
            .call();

          setDividend(_div);
        }
      }
    };
    return () => {};
  }, [elonInstance]);

  const claim = async (e) => {
    const prev = e.target.innerHTML;
    e.target.setAttribute("disabled", true);
    e.target.innerHTML = "Loading.....";
    await claimDiv(elonInstance);
    e.target.innerHTML = prev;
    e.target.removeAttribute("disabled");
  };

  return (
    <div className="container mmmmm">
      <div className="vertical text-center">
        <h1 style={{ fontSize: "100%", fontWeight: "bold" }}>
          ONLY HOLDERS CAN CLAIM DIVIDENDS
        </h1>
        <br></br>
        <div>Your Dividends : {dividend}</div>{" "}
        <button className="btn btn-outline-primary" onClick={claim}>
          Claim Dividend
        </button>
      </div>
    </div>
  );
};

export default Claim;
