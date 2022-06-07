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

import { ErrorContext } from './ErrorContext';
import { LoadingContext } from './LoadingContext';

interface IWalletContext {
  currentWallet: string;
  setCurrentWallet: Dispatch<SetStateAction<string>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  checkEthereum: (showError?: any) => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  checkWallets: (ethereumWallets?: any, method?: any) => Promise<boolean>;
  connectMetaMaskWallet: (route?: string) => Promise<void>;
}

export const WalletContext = createContext<IWalletContext>(
  {} as IWalletContext,
);

export function WalletProvider({ children }) {
  const [currentWallet, setCurrentWallet] = useState<string>('');
  const { setError } = useContext(ErrorContext);
  const { setLoading } = useContext(LoadingContext);
  const { push } = useRouter();

  const checkEthereum = useCallback(
    (showError = false) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { ethereum } = window as any;

      if (!ethereum) {
        if (showError) {
          setError(
            'Metamask is not available in this browser. Please install Metamask to continue.',
          );
        }
        return;
      }

      return ethereum;
    },
    [setError],
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

        await axios.post('/api/cobogo/createWallet', {
          walletAddress,
        });

        setCurrentWallet(walletAddress);

        return true;
      } catch (error) {
        setError(error.message);
      }
    },
    [setCurrentWallet, checkEthereum, setError],
  );

  async function connectMetaMaskWallet(route?: string) {
    try {
      if (!checkEthereum(true)) return;

      setLoading(true);
      await checkWallets(null, 'eth_requestAccounts');
      setLoading(false);

      if (route) {
        push(route);
      }
    } catch (error) {
      setError(error.message);
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
