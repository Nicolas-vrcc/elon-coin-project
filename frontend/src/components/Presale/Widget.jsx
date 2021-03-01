import React from "react";

const Widget = (props) => {
  return (
    <>
      <div className="shadow pt-3 pb-3" style={{ borderRadius: "30px" }}>
        <div className="text-center" style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "200%" }}>
            PRESALE (
            {props.tl < 0 ? (
              <small className="text-danger ">Ended</small>
            ) : (
              <small>
                Ends in
                <b className="text-danger ">{props.tl.toFixed(0)} days(s)</b>
              </small>
            )}
            )
          </div>
          <b>{props.tkn} ELON Left</b>
          <br></br>
        </div>
        <div>
          <div
            className="mr-3 ml-3"
            style={{
              display: "grid",
              gridAutoRows: "auto",
              rowGap: "12px",
            }}
          >
            <div className="box-input shadow-none bg-light ">
              <div className="border-radius">
                <div className="header">
                  <div className="inner-header">
                    <div className="main-text">From</div>
                    <div
                      className="busdmax main-text"
                      style={{ display: "inline", cursor: "pointer" }}
                    >
                      Balance: {props.busdBalance.toFixed(4)}
                    </div>
                  </div>
                </div>
                <div className="input-field-div">
                  <input
                    className="input-field"
                    id="busd"
                    inputMode="decimal"
                    title="Token Amount"
                    autoComplete="off"
                    autoCorrect="off"
                    type="number"
                    pattern="^[0-9]*[.,]?[0-9]*$"
                    placeholder="0.0"
                    minLength="1"
                    maxLength="79"
                    spellCheck="false"
                    value={props.busd}
                    onChange={props.onBusdChange}
                  ></input>
                  <button className="max busdmax">MAX</button>
                  <button className="button currency">
                    <span>
                      <img src="busd.png" alt="busd" />
                      <span className="token-symbol-container">BUSD</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="separator">
              <div className="sepdiv" style={{ padding: "0px 1rem" }}>
                <div style={{ padding: "2px" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <polyline points="19 12 12 19 5 12"></polyline>
                  </svg>
                </div>
              </div>
            </div>
            <div className="shadow-none bg-light">
              <div className="border-radius">
                <div className="header">
                  <div className="inner-header">
                    <div className="main-text">To (estimate)</div>
                    <div
                      className="main-text"
                      style={{ display: "inline", cursor: "pointer" }}
                    >
                      Balance: {props.elonBalance.toFixed(4)}
                    </div>
                  </div>
                </div>
                <div className="input-field-div">
                  <input
                    className="input-field"
                    inputMode="decimal"
                    title="Token Amount"
                    autoComplete="off"
                    autoCorrect="off"
                    type="number"
                    pattern="^[0-9]*[.,]?[0-9]*$"
                    placeholder="0.0"
                    minLength="1"
                    maxLength="79"
                    spellCheck="false"
                    value={props.elon}
                    onChange={props.onElonChange}
                  ></input>

                  <button className="button currency">
                    <span>
                      <img src="favicon.png" alt="busd" />
                      <span className="token-symbol-container">ELON</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="price">
              <div className="price inner">
                <div className="price inner inner">
                  <div className="price-amount">Price</div>
                  <div
                    className="price-amount"
                    id="estimate"
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    4 BUSD per ELON
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="swap-btn ml-3 mr-3">{props.button}</div>
        </div>
      </div>
      <div className="text-center">
        <img className="mt-4" src="car.png" width="20%" alt=""></img>
      </div>
    </>
  );
};

export default Widget;
