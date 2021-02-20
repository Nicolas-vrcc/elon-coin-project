import React, {useState} from "react";
import Footer from "../Footer/Footer";
import Overview from "../Overview/Overview";
import Presale from "../Presale/Presale";
import Roadmap from "../Roadmap/Roadmap";
import Tokenomics from "../Tokenomics/Tokenomics";
import Header from "../Header/Header";
import { connectMetamaskWallet } from "../../funcs";

const Main = props => {

    const [metamask, setMetamask] = useState({status:false, address:0});

    const connectedMetamask = (address)=>{
       setMetamask({status:true, address:address}) 
    }
    return(
        <div className="container">
            <section id="header" className="text-center">
                <Header/>
            </section>
            <section id="presale" className="pt-5">
                <Presale connected={{...metamask}} update={connectedMetamask} />
            </section>
            <section className="pt-5" style={{backgroundColor:"black", color:"white"}}>
                <Overview/>
                <Roadmap/>
                <Tokenomics/>
            </section>
            <section id="footer" className="pt-5">
                <Footer/>
            </section>
        </div>
    )
}

export default Main;