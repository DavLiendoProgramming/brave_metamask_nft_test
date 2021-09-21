import React, {
  useReducer,
  useEffect,
  useCallback,
  createContext,
} from 'react';

import { Web3Reducer } from './reducer';

// WEB3 CONNECTION PACKAGES

import Web3 from 'web3';
import { InjectedConnector } from '@web3-react/injected-connector';

//Constants, contracts, addresses

import { USDT, BraveTest } from './constants';

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});
