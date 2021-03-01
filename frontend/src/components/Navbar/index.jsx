import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = (props) => {
  const scrollTo = (id, offset = 70) => {
    var element = document.getElementById(id).offsetTop;
    window.scrollTo({ top: element - offset, behavior: "smooth" });
  };
  return (
    <>
      <div className="nav-desktop">
        <div className="nav-desktop-nav">
          <a
            href="#/"
            className="item"
            onClick={() => {
              scrollTo("overview");
            }}
          >
            OVERVIEW
          </a>
          <a
            href="#/"
            className="item"
            onClick={() => {
              scrollTo("roadmap");
            }}
          >
            ROADMAP
          </a>
          <a
            href="#/"
            className="item"
            onClick={() => {
              scrollTo("tokenomic");
            }}
          >
            TOKENOMIC
          </a>
          <a
            href="#/"
            className="item"
            onClick={() => {
              scrollTo("presale");
            }}
          >
            PRESALE
          </a>
          <Link to="/claim" className="item">
            CLAIM DIVIDEND
          </Link>
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
            <a className="social-icon mr-3" href="//t.me/EloncoinOfficialChat">
              <i className="fa fa-telegram" />
            </a>
            <a
              href="//mobile.twitter.com/TheRealEloncoin"
              className="social-icon mr-3"
            >
              <i className="fa fa-twitter" />
            </a>
            <a className="social-icon" href="//therealeloncoin.medium.com/">
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
            <a
              href="#/"
              onClick={() => {
                scrollTo("overview");
              }}
            >
              Overview
            </a>
            <a
              href="#/"
              onClick={() => {
                scrollTo("roadmap");
              }}
            >
              Roadmap
            </a>
            <a
              href="#/"
              onClick={() => {
                scrollTo("tokenomic");
              }}
            >
              Tokenomic
            </a>
            <a
              href="#/"
              onClick={() => {
                scrollTo("presale");
              }}
            >
              Presale
            </a>
            <Link to="/claim">Claim Dividends</Link>
            <a
              href="//t.me/EloncoinOfficialChat"
              target="_blank"
              rel="noreferrer"
            >
              Telegram
            </a>
            <a
              href="//twitter.com/TheRealEloncoin"
              target="_blank"
              rel="noreferrer"
            >
              Twitter
            </a>
            <a
              href="//therealeloncoin.medium.com"
              target="_blank"
              rel="noreferrer"
            >
              Medium
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
