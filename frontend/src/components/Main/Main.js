import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Overview from "../Overview/Overview";
import Presale from "../Presale/Presale";
import Roadmap from "../Roadmap/Roadmap";
import Tokenomics from "../Tokenomics/Tokenomics";
import Header from "../Header/Header";
import { loadWeb3 } from "../../funcs";

const Main = (props) => {
  const [metamask, setMetamask] = useState({
    status: false,
    address: 0,
    networkId: 0,
  });

  useEffect(() => {
    const event = async () => {
      const web3 = await loadWeb3();

      web3.currentProvider.on("accountsChanged", ([account]) => {
        setMetamask({ ...metamask, address: account });
      });
      web3.currentProvider.on("networkChanged", (networkId) => {
        setMetamask({ ...metamask, networkId: networkId });
      });
    };
    event();
  }, []);

  const connectedMetamask = (address, networkId) => {
    setMetamask(() => {
      return { status: true, address: address };
    });
    if (networkId) {
      setMetamask({ ...metamask, networkId: networkId });
    }
  };
  return (
    <>
      <section id="header" className="text-center">
        <Header />
      </section>
      <section id="presale" className="pt-5">
        <Presale connected={{ ...metamask }} update={connectedMetamask} />
      </section>
      <section
        className="pt-5"
        style={{ backgroundColor: "black", color: "white" }}
      >
        <Overview />
        <Roadmap />
        <Tokenomics />
      </section>
      <section id="footer" className="pt-5">
        <Footer />
      </section>
    </>
  );
};

export default Main;
