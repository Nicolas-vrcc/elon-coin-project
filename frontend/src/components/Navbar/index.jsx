import React from "react";
import "./Navbar.css";

const Navbar = (props) => {
  return (
    <>
      <div className="nav-desktop">
        <div className="nav-desktop-nav">
          <a href="/#overview" className="item">
            OVERVIEW
          </a>
          <a href="/#roadmap" className="item">
            ROADMAP
          </a>
          <a href="/#tokenomic" className="item">
            TOKENOMIC
          </a>
          <a href="/#presale" className="item">
            PRESALE
          </a>
          {props.connected.status ? (
            props.networkError ? (
              <button className="item connect-wrong-network">
                <div className="swap-button-text">Wrong Network</div>
              </button>
            ) : (
              <a
                href={`//bscscan.com/address/${props.connected.address}`}
                target="_blank"
                rel="noreferrer"
                className="item address"
              >
                {props.connected.address.substr(0, 5)}...
                {props.connected.address.substr(-5)}
              </a>
            )
          ) : props.notSupported ? (
            <button className="item connect-wrong-network">
              <div className="swap-button-text">Invalid Browser</div>
            </button>
          ) : (
            <a
              href="/#"
              className="item connect"
              onClick={(e) => {
                e.preventDefault();
                props.triggerPopup(true);
              }}
            >
              CONNECT WALLET
            </a>
          )}
        </div>
        <div className="container">
          <div className="d-flex justify-content-end">
            <a className="social-icon mr-3" href="//t.me/eloncoin">
              <i className="fa fa-telegram" />
            </a>
            <a href="//twitter.com/eloncoin" className="social-icon mr-3">
              <i className="fa fa-twitter" />
            </a>
            <a className="social-icon" href="//medium.com/@eloncoin">
              <i className="fa fa-medium " />
            </a>
          </div>
        </div>
      </div>
      <div className="nav-mobile">
        <div className="d-flex">
          <a
            href="/#"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("mySidenav").style.width = "30%";
            }}
          >
            <i className="fa fa-bars"></i>
          </a>

          <div className="d-flex justify-content-end" style={{ width: "100%" }}>
            {props.connected.status ? (
              props.networkError ? (
                <button className="item connect-wrong-network">
                  <div className="swap-button-text">Wrong Network</div>
                </button>
              ) : (
                <a
                  href={`//bscscan.com/address/${props.connected.address}`}
                  target="_blank"
                  rel="noreferrer"
                  className="item address"
                >
                  {props.connected.address.substr(0, 5)}...
                  {props.connected.address.substr(-5)}
                </a>
              )
            ) : props.notSupported ? (
              <button className="item connect-wrong-network">
                <div className="swap-button-text">Invalid Browser</div>
              </button>
            ) : (
              <a
                href="/#"
                className="connect"
                onClick={(e) => {
                  e.preventDefault();
                  props.triggerPopup(true);
                }}
              >
                Connect Wallet
              </a>
            )}
          </div>
        </div>
        <div id="mySidenav" className="sidenav">
          <a
            href="/#"
            className="closebtn"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("mySidenav").style.width = "0px";
            }}
          >
            <i className="fa fa-times"></i>
          </a>
          <div className="links">
            <a href="/#overview">Overview</a>
            <a href="/#roadmap">Roadmap</a>
            <a href="/#tokenomic">Tokenomic</a>
            <a href="/#presale">Presale</a>

            <a href="//t.me/eloncoin" target="_blank" rel="noreferrer">
              Telegram
            </a>
            <a href="//twitter.com/eloncoin" target="_blank" rel="noreferrer">
              Twitter
            </a>
            <a href="//medium.com/@eloncoin" target="_blank" rel="noreferrer">
              Medium
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
