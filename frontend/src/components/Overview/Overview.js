import React from "react";

const Overview = props => {
    return(
        <div className="text-center pb-5" id="overview">
            <h1 className="pt-4 pb-4">Overview</h1>
            <div className="row">
                <div class="col">
                    <h4 className="col-header">EFFICIENT</h4>
                </div>
                <div class="col">
                    <h4 className="col-header">ECONOMIC</h4>
                </div>
                <div class="col">
                    <h4 className="col-header">TRANSPERANCY</h4>
                </div>
            </div>        
            <div className="row">
                <div className="col col-img">
                    <img src="mars.png"width="30%"></img>
                    <p>You used to like the train ERC20? <br/>Please meet the rocket BEP20.</p>
                </div>
                <div className="col col-img">
                    <img src="money.png"width="30%"></img>
                    <p>Eloncoin is made for going to Mars... with you!</p>
                </div>
                <div className="col col-img">
                    <img src="thumbs.png"width="30%"></img>
                    <p>We know we owe you everything.</p>
                </div>
                
            </div>
            <div className="row">
                <div className="col col-footer">
                    <p>ERC20 network has gone saturated these last months resulting in long transactions and expensive fees. Transactions on BEP20 Network are faster and less expensive.<br/>Something like 0.02$.<br/><br/>Yeah, wow!</p>
                </div>
                <div className="col col-footer">
                    <p>0.5% of all transactions will be burnt. 3% of every transaction is given back to holders.<br/>We just couldn’t see the future of Yield-Farming without being part of it. Twice.</p>
                </div>
                <div className="col col-footer">
                    <p>That’s why we will keep you informed about the project on Twitter &Telegram.<br/>Biggest holders will have a specific channel for adding further information.</p>
                </div>
            </div>
        </div>
    )
}

export default Overview;