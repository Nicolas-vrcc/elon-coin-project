import React from "react";
import "./Presale.css"

const Presale = props => {
    const bnb = 12.9;
    const elon = 1211.9;

    const headerText = {
        "display": "flex",
        "flex-flow": "row nowrap",
        "-webkit-box-align": "center",
        "align-items": "center",
        "font-size": "0.75rem",
        "line-height": "1rem",
        "padding": "0.75rem 1rem 0px"
    }
    const innerHeaderText = {
        "box-sizing": "border-box",
        "margin": "0px",
        "min-width": "0px",
        "width": "100%",
        "display": "flex",
        "padding": "0px",
        "-webkit-box-align": "center",
        "align-items": "center",
        "-webkit-box-pack": "justify",
        "justify-content": "space-between",
    }

    const mainText = {
        "box-sizing": "border-box",
        "margin": "0px",
        "min-width": "0px",
        "font-weight": "500",
        "font-size": "14px"
    }

    const inputFieldDiv = {
        "display": "flex",
        "flex-flow": "row nowrap",
        "-webkit-box-align": "center",
        "align-items": "center",
        "padding": "0.75rem 0.75rem 0.75rem 1rem"
    }

    const inputField = {
        "width": "50%",
        "position": "relative",
        "font-weight": "500",
        "outline": "none",
        "border": "none",
        "flex": "1 1 auto",
        "font-size": "24px",
        backgroundColor:"transparent",
        "white-space": "nowrap",
        "overflow": "hidden",
        "text-overflow": "ellipsis",
        "padding": "0px",
        "appearance": "textfield"
    }
    return(
        <div className="d-flex justify-content-around">
            <img src="side.png" width="50%"></img>
            <div className="text-center">
                <div className="shadow pt-3 pb-3" style={{"border-radius": "30px"}}>
                    <div className="text-center" style={{marginBottom: "20px"}}>
                        <p style={{fontSize:"200%"}}>PRESALE</p>
                    </div>
                    <div >
                        <div className="mr-3 ml-3"style={{display:"grid",gridAutoRows: "auto", "row-gap": "12px"}}>
                            <div className="box-input shadow-none bg-light ">
                                <div className="border-radius">
                                    <div style={headerText}>
                                        <div style={innerHeaderText}>
                                            <div style={mainText}>From</div>
                                            <div style={mainText, {display:"inline", cursor:"pointer"}}>Balance: {bnb}</div>
                                        </div>
                                    </div>
                                    <div style={inputFieldDiv}>
                                        <input style={inputField} inputmode="decimal" title="Token Amount" autocomplete="off" autocorrect="off" type="text" pattern="^[0-9]*[.,]?[0-9]*$" placeholder="0.0" minlength="1" maxlength="79" spellcheck="false"></input>
                                        <button class="max">MAX</button>
                                        <button className="button currency">
                                            <span>
                                                <img src="busd.png" />
                                                <span class="token-symbol-container">BUSD</span>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="separator">
                                <div className="sepdiv" style={{padding: "0px 1rem"}}>
                                    <div style={{padding:"2px"}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
                                    </div>
                                </div>
                            </div>
                            <div className="shadow-none bg-light" >
                                    <div className="border-radius">
                                        <div style={headerText}>
                                            <div style={innerHeaderText}>
                                                <div style={mainText}>To (estimate)</div>
                                                <div style={mainText, {display:"inline", cursor:"pointer"}}>Balance: {elon}</div>
                                            </div>
                                        </div>
                                        <div style={inputFieldDiv}>
                                            <input style={inputField} inputmode="decimal" title="Token Amount" autocomplete="off" autocorrect="off" type="text" pattern="^[0-9]*[.,]?[0-9]*$" placeholder="0.0" minlength="1" maxlength="79" spellcheck="false"></input>

                                            <button className="button currency">
                                                <span>
                                                    <img src="busd.png" />
                                                    <span class="token-symbol-container">ELON</span>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            <div className="price">
                                <div className="price inner">
                                    <div className="price inner inner">
                                        <div className="price-amount">Price</div>
                                        <div className="price-amount" id="estimate" style={{justifyContent: "center", alignItems: "center", display: "flex"}}>4 BUSD per ELON</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="swap-btn ml-3 mr-3">
                            <button  id="swap-button">
                                <div className="swap-button-text">Buy</div>
                            </button>
                        </div>
                    </div>
                </div>
                <img className="mt-4" src="car.png" width="20%"></img> 
            </div>
        </div>
    )
}

export default Presale;