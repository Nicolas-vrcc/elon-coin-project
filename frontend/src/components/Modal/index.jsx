import React from "react";
import "./Modal.css";

const Modal = ({ handleClose, show, connect }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <div className="d-flex text-center justify-content-center mt-3">
        <section className="modal-main">
          <div
            style={{ fontWeight: "bold" }}
            className="d-flex justify-content-between  p-4"
          >
            <div>Connect to a wallet</div>
            <svg
              style={{ cursor: "pointer" }}
              onClick={(e) => handleClose(false)}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>

          <div
            className="network d-flex justify-content-between mb-2"
            onClick={(e) => connect()}
          >
            <div style={{ fontWeight: "bold" }}>MetaMask</div>
            <div>
              <img src="metamask.png" width="25" alt="MetaMask" />
            </div>
          </div>
          <div
            className="network d-flex justify-content-between mb-4"
            onClick={(e) => connect()}
          >
            <div style={{ fontWeight: "bold" }}>Trust Wallet</div>
            <img src="twt.svg" width="20" alt="TrustWallet" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Modal;
