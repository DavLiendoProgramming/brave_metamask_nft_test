import './App.css';
import ConnectMetamask from './components/wallets/ConnectMetamask.js';
import { SendNFT } from './components/actions/SendNFT';
import { GetNFTBalance } from './components/actions/GetNFTBalance';
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';

function getLibrary(provider) {
  return new Web3(provider);
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className="App">
        <header className="App-header">
          <h1> Testing web3 inside brave with metamask</h1>
          <GetNFTBalance />
          <SendNFT />
          <ConnectMetamask />
          <p>Current amount of NFT available:</p>
        </header>
      </div>
    </Web3ReactProvider>
  );
}

export default App;
