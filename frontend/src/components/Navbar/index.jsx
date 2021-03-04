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

      <div id="menuToggle">
        <input type="checkbox" />
        <span></span>
        <span></span>
        <span></span>

        <ul id="menu">
          <a
            href="#/"
            onClick={() => {
              scrollTo("overview");
            }}
          >
            <li>Overview</li>
          </a>
          <a
            href="#/"
            onClick={() => {
              scrollTo("roadmap");
            }}
          >
            <li>Roadmap</li>
          </a>
          <a
            href="#/"
            onClick={() => {
              scrollTo("tokenomic");
            }}
          >
            <li>Tokenomic</li>
          </a>
          <a
            href="#/"
            onClick={() => {
              scrollTo("presale");
            }}
          >
            <li>Presale</li>
          </a>

          <a
            href="//t.me/EloncoinOfficialChat"
            target="_blank"
            rel="noreferrer"
          >
            <li>Telegram</li>
          </a>
          <a
            href="//twitter.com/TheRealEloncoin"
            target="_blank"
            rel="noreferrer"
          >
            <li>Twitter</li>
          </a>
          <a
            href="//therealeloncoin.medium.com"
            target="_blank"
            rel="noreferrer"
          >
            <li>Medium</li>
          </a>
          <Link to="/claim">Claim Dividends</Link>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
