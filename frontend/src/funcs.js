import Web3 from 'web3';
import ElonCoinWithPresale from "./abi/ElonCoinWithPresale.json";
import BUSDToken from "./abi/BUSD.json";

export const loadWeb3 = () =>{
    const web3 = new Web3(window.ethereum);;
    window.web3 = web3;
    return web3;
}

export const getAccounts = async ()=>{
    await connectMetamaskWallet()
    const [account] = await window.web3.eth.getAccounts();
    return account
}
export const getContractInstances = async (mm,bsc) =>{
    const web3 = await loadWeb3();
    
    //ElonCoin
    const elonABI = ElonCoinWithPresale.abi; 
    const elonAddress = ElonCoinWithPresale.networks[Object.keys(ElonCoinWithPresale.networks)[0]].address; 
    const elonInstance = await new web3.eth.Contract(elonABI, elonAddress);

    //BUSD
    const busdABI = BUSDToken.abi; 
    const busdAddress = BUSDToken.networks[Object.keys(BUSDToken.networks)[0]].address; 
    const busdInstance = await new web3.eth.Contract(busdABI, busdAddress);
    
    console.log(await busdInstance.methods.balanceOf(elonAddress).call());
    return [elonInstance, busdInstance]
}
export const connectMetamaskWallet = async () =>{
    const web3 = loadWeb3();
    await web3.currentProvider.enable();
}
export const connectBinanceChainWallet = () =>{

}