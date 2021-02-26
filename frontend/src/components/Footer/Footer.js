import React from "react";
import "./styles.css";

const Footer = (props) => {
  return (
    <>
      <div className="text-center">
        <div className="header-footer">
          <h3>
            <b>This is where it starts</b>
          </h3>
          <h6>Fasten your seat belts</h6>
        </div>
        <a href="#header">
          <img src="back_to_top.png" width="10%" alt="top_banner"></img>
        </a>
      </div>
      <div>
        <div className="last container">
          <img src="car.png" width="10%" alt=""></img>
          <img src="mars.png" width="10%" alt=""></img>
        </div>
      </div>
    </>
  );
};

export default Footer;
