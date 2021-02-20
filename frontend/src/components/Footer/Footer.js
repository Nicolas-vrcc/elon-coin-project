import React from "react";

const Footer = props => {
    return(
        <>
            <div className="text-center">
                <div className="header-footer">
                    <h1>This is where it starts</h1>
                    <h3>Fasten your seat belts</h3>
                </div>
                <a href="#header"><img src="back_to_top.png" width="30%" alt="top_banner"></img></a>
            </div>
            <div>
                <div className="float-left">
                    <img src="car.png" width="50%"></img>
                </div>
                <div className="float-right mb-5">
                    <img src="mars.png" className="float-right" width="30%"></img>
                </div>
            </div>
        </>
    )
}


export default Footer;