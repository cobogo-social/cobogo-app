import axios from 'axios';
import { useRouter } from 'next/router';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { LoadingContext } from './LoadingContext';
import { MessageContext } from './MessageContext';

interface IWalletContext {
  currentWallet: string;
  setCurrentWallet: Dispatch<SetStateAction<string>>;

  checkEthereum: (showError?: unknown) => any;

  checkWallets: (
    ethereumWallets?: unknown,
    method?: unknown,
  ) => Promise<boolean>;
  connectMetaMaskWallet: (route?: string) => Promise<void>;
}

export const WalletContext = createContext<IWalletContext>(
  {} as IWalletContext,
);

export function WalletProvider({ children }) {
  const [currentWallet, setCurrentWallet] = useState('');
  const { setMessage } = useContext(MessageContext);
  const { setLoading } = useContext(LoadingContext);
  const { push } = useRouter();

  const checkEthereum = useCallback(
    (showError = false) => {
      const { ethereum } = window as any;

      if (!ethereum) {
        if (showError) {
          setMessage({
            text: "you don't have the MetaMask extension installed in your browser yet. Don't worry, you can always do it later.",
            type: 'warning',
          });
        }
        return;
      }

      return ethereum;
    },
    [setMessage],
  );

  const checkWallets = useCallback(
    async (ethereumWallets = null, method = 'eth_accounts') => {
      try {
        let ethereumAccounts = ethereumWallets;

        if (!ethereumAccounts) {
          const ethereum = checkEthereum();
          if (!ethereum) return;

          ethereumAccounts = await ethereum.request({
            method,
          });
        }

        if (ethereumAccounts.length <= 0) {
          setCurrentWallet('');
          return false;
        }

        const walletAddress = ethereumAccounts[0];

        setCurrentWallet(walletAddress);

        return true;
      } catch (error) {
        setMessage({
          text: error.message,
          type: 'error',
        });
      }
    },
    [setCurrentWallet, checkEthereum, setMessage],
  );

  async function connectMetaMaskWallet(route?: string) {
    try {
      if (!checkEthereum(true)) return;

      setLoading(true);

      await checkWallets(null, 'eth_requestAccounts');

      const ethereum = checkEthereum();

      const ethereumAccounts = await ethereum.request({
        method: 'eth_accounts',
      });

      const walletAddress = ethereumAccounts[0];

      if (route) {
        await axios
          .post('/api/cobogo/createWallet', {
            walletAddress,
          })
          .then((response) => {
            if (response.data.error) {
              setMessage({
                text: response.data.error,
                type: 'error',
              });
            }
          });
      }

      setLoading(false);

      if (route) {
        push(route);
      }
    } catch (error) {
      setMessage({
        text: error.message,
        type: 'error',
      });
    }
  }

  useEffect(() => {
    const ethereum = checkEthereum();

    if (!ethereum) return;

    ethereum.on('accountsChanged', (ethereumAccounts) => {
      checkWallets(ethereumAccounts);
    });

    checkWallets();
  }, [checkWallets, checkEthereum]);

  return (
    <WalletContext.Provider
      value={{
        currentWallet,
        setCurrentWallet,
        checkEthereum,
        checkWallets,
        connectMetaMaskWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}
