import React from "react";
const Tokenomics = (props) => {
  return (
    <div className="text-center pb-2 ml-3 mr-3" id="tokenomic">
      <h1 className="pt-2 pb-2">Tokenomics</h1>
      <img src="tokenomics.png" alt="pie chart" />
      <div className="container d-flex justify-content-end">
        <b>
          <i>Max Supply : 100000</i>
        </b>
      </div>
    </div>
  );
};

export default Tokenomics;
