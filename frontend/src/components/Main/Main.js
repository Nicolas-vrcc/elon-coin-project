import React from "react";
import Footer from "../Footer/Footer";
import Overview from "../Overview/Overview";
import Presale from "../Presale/Presale";
import Roadmap from "../Roadmap/Roadmap";
import Tokenomics from "../Tokenomics/Tokenomics";
import Header from "../Header/Header";

const Main = props => {
    return(
        <div className="container">
            <section id="header" className="text-center">
                <Header/>
            </section>
            <section id="presale" className="pt-5">
                <Presale/>
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