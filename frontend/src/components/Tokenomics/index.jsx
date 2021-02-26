import React, { useEffect } from "react";
import { Piechart } from "../../funcs";
import Legends from "./Legends";
const Tokenomics = (props) => {
  const TOTAL_SUPPLY = 100000;
  var shares = {
    data: {
      "Team - 20%": TOTAL_SUPPLY * (20 / 100),
      "Private Sale - 20%": TOTAL_SUPPLY * (20 / 100),
      "Reward Pool/ Staking Farmings - 40%": TOTAL_SUPPLY * (40 / 100),
      "Initial Liquidty Pool - 15%": TOTAL_SUPPLY * (15 / 100),
      "Development - 5%": TOTAL_SUPPLY * (5 / 100),
    },
    colors: ["#fde23e", "#f16e23", "#57d9ff", "#937e88", "#008"],
  };
  useEffect(() => {
    var myCanvas = document.getElementById("myCanvas");

    // using the function
    new Piechart({
      canvas: myCanvas,
      data: shares.data,
      colors: shares.colors,
    }).draw();
  }, []);
  return (
    <div className="text-center pb-2" id="tokenomic">
      <h1 className="pt-2 pb-2">Tokenomics</h1>
      <Legends data={{ ...shares.data }} colors={shares.colors} />
      <div>
        <canvas
          id="myCanvas"
          className="mt-2"
          style={{ width: "50%", height: "50%", margin: "0", padding: "0" }}
        ></canvas>
      </div>
      <div className="container d-flex justify-content-end">
        <b>
          <i>Max Supply : 100000</i>
        </b>
      </div>
    </div>
  );
};

export default Tokenomics;
