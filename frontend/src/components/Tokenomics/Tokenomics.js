import React from "react";

const Tokenomics = props => {
    return(
        <div className="pb-5">
            <div className="text-center" id="tokenomic">
                <h1 className="pt-4 pb-4">Tokenomics</h1>
                <img src="tokenomics.png" width="80%" height="100%" alt="tokenomics"></img>
            </div>
            <div className="float-right mr-3">
                <p>Max Supply : 100000</p>
            </div>
        </div>
    )
}

export default Tokenomics;