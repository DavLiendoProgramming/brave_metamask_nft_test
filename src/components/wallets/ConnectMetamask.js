import { useWeb3React } from '@web3-react/core';
import { injected } from '../../web3/connectors';

export default function Home() {
  const {
    active,
    account,
    library,
    connector,
    activate,
    deactivate,
  } = useWeb3React();

  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <div className="flex flex-col my-5 justify-center items-center">
      <button
        onClick={connect}
        className="w-48  bg-purple-700 px-2 py-1 rounded text-base font-bold mb-3"
      >
        Connect to MetaMask
      </button>

      <button
        onClick={disconnect}
        className="w-48 bg-purple-700 px-2 py-1 rounded text-base font-bold mb-3"
      >
        Disconnect
      </button>
      <div className="text-base font-bold">
        Status:{' '}
        {active ? (
          <span className="text-base">
            Connected with <b>{account}</b>
          </span>
        ) : (
          <span className="text-base">Not connected</span>
        )}
      </div>
    </div>
  );
}
