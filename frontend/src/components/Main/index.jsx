import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import Overview from "../Overview";
import Presale from "../Presale";
import Roadmap from "../Roadmap";
import Tokenomics from "../Tokenomics";
import Header from "../Header";
import Navbar from "../Navbar";
import Modal from "../Modal";

import {
  loadWeb3,
  getContractInstances,
  connectWallet,
  getAccounts,
} from "../../funcs";

const Main = (props) => {
  const [connection, setConnection] = useState({
    status: false,
    address: "",
    networkId: 0,
  });

  const [instances, setInstances] = useState({ elon: "", busd: "" });
  const [wrongNetwork, setWrongNetwork] = useState(false);
  const [notSupported, setNotSupported] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tokensLeft, setTokensLeft] = useState("100000");

  useEffect(() => {
    const event = async () => {
      const web3 = await loadWeb3();

      if (web3.message) {
        // throw new Error(web3.message);
        alert(web3.message);
        return;
      }
      web3.currentProvider.on("accountsChanged", ([account]) => {
        if (account) updateConnection(account, connection.networkId);
        else
          setConnection({
            ...connection,
            status: false,
            address: "",
          });
      });
      web3.currentProvider.on("networkChanged", async (networkId) => {
        updateConnection(await getAccounts(), networkId);
      });
    };
    event();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const [elon, busd, error, noWeb3] = await getContractInstances();
      if (error) {
        setWrongNetwork(true);
        setInstances({ elon: "", busd: "" });
        setNotSupported(false);
      } else if (noWeb3) {
        setInstances({ elon: "", busd: "" });
        setWrongNetwork(false);
        setNotSupported(true);
      } else {
        setInstances({ elon: elon, busd: busd });
        const tknLeft = await elon.methods.tokensLeft().call();
        setTokensLeft(tknLeft / 1e18);
        setNotSupported(false);
        setWrongNetwork(false);
      }
    };
    fetch();
  }, [connection.networkId, connection.address]);

  const updateConnection = (address, networkId) => {
    setConnection((meta) => {
      return { ...meta, status: true, address: address };
    });
    if (networkId) {
      setConnection((meta) => {
        return { ...meta, networkId: networkId };
      });
    }
  };

  const connect = async () => {
    await connectWallet();
    const acc = await getAccounts();
    updateConnection(acc);
    if (showModal) setShowModal(false);
  };

  return (
    <>
      <section id="nav-bar">
        <Navbar
          triggerPopup={setShowModal}
          networkError={wrongNetwork}
          notSupported={notSupported}
          connect={connect}
          connected={{ ...connection }}
          update={updateConnection}
        />
      </section>
      <section id="header" className="text-center mt-5 mb-5">
        <Header />
      </section>
      <section id="presale" className="mt-2">
        <Presale
          triggerPopup={setShowModal}
          networkError={wrongNetwork}
          notSupported={notSupported}
          tokensLeft={tokensLeft}
          instances={instances}
          connect={connect}
          connected={{ ...connection }}
          update={updateConnection}
        />
      </section>
      <section style={{ backgroundColor: "black", color: "white" }}>
        <Overview />
        <Roadmap />
        <Tokenomics />
      </section>
      <section id="footer" className="mt-1">
        <Footer />
      </section>
      <Modal connect={connect} show={showModal} handleClose={setShowModal} />
    </>
  );
};

export default Main;
