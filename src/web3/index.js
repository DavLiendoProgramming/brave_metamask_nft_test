import React, {
  useReducer,
  useEffect,
  useCallback,
  createContext,
} from 'react';
import notify from '../utils/notify';
import { Web3Reducer } from './reducer';
// WEB3 CONNECTION PACKAGES

import Web3 from 'web3';
import Web3Modal from 'web3modal';
import { InjectedConnector } from '@web3-react/injected-connector';
import WalletConnectProvider from '@walletconnect/web3-provider';

//Constants, contracts, addresses

import { USDT, ERC20, BraveTest, BraveTest_ABI } from './constants';

let web3;

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

const initialState = {
  loading: true,
  account: null,
  networkId: null,
  contracts: {
    token: null,
  },
};

export const Web3Context = createContext(initialState);

export const Web3Provider = ({ children }) => {
  const [state, dispatch] = useReducer(Web3Reducer, initialState);

  const { account, contracts } = state;

  // STATE MANAGEMENT
  const setAccount = (account) => {
    dispatch({
      type: 'SET_ACCOUNT',
      payload: account,
    });
  };

  const setContracts = (contracts) => {
    dispatch({
      type: 'SET_CONTRACTS',
      payload: contracts,
    });
  };

  const setNetworkId = (networkId) => {
    dispatch({
      type: 'SET_NETWORK_ID',
      payload: networkId,
    });
  };

  // Connect Web3 wallet and set state (contracts, roles, account)
  const connectWeb3 = useCallback(async () => {
    // Web3 Modal
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: '36bbdc3ed5bd449fad0374a2e07b850a', // required
        },
      },
    };

    try {
      const web3Modal = new Web3Modal({
        // network: "mainnet", // optional
        cacheProvider: true, // optional
        providerOptions, // required
        theme: 'light',
      });

      const provider = await web3Modal.connect();

      web3 = new Web3(provider);
      window.web3 = web3;

      const _accounts = await web3.eth.getAccounts();
      await setProtocol(_accounts);
      console.log('Connected Account: ', _accounts[0]);

      notify('success', 'connected web3 wallet', 1500);

      window.ethereum.on('chainChanged', () => {
        document.location.reload();
      });

      //If accounts change
      window.ethereum.on('accountsChanged', (accounts) => {
        document.location.reload();
      });
    } catch (error) {
      notify('error', 'Could not connect to web3!');
      console.log(error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setProtocol = async (accounts) => {
    console.log('received accounts:', accounts);
    setAccount(accounts[0]);
    console.log('net:', state.networkId);
    // Contract Instances
    const networkId = await web3.givenProvider.networkVersion;
    setNetworkId(networkId);
    window.BVT = new web3.eth.Contract(BraveTest_ABI, BraveTest, {
      from: accounts[0],
    });
    window.ERC20 = new web3.eth.Contract(ERC20, USDT, { from: accounts[0] });
    setContracts({
      BraveTest: window.BVT,
      USDT: window.USDT,
    });
  };

  const getBalance = async (account) => {
    try {
      const BVTBalance = await contracts.BVT.methods.balanceOf(account).call();
      notify('your bvt balnace is: ', BVTBalance, 1500);
    } catch (error) {
      console.log(error);
    }
  };
  // === HELPERS === //
  const transferBVT = async (receiver) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
  const toWei = (value) => web3.utils.toWei(String(value));
  const fromWei = (value) => Number(web3.utils.fromWei(String(value)));
  const toBN = (value) => new web3.utils.BN(String(value));

  return (
    <Web3Context.Provider
      value={{
        ...state,
        connectWeb3,
        toWei,
        fromWei,
        toBN,
        getBalance,
        web3,
        BVT: contracts.BVT,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
