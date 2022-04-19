import ReferralDashboardContainer from '@components/containers/ReferralDashboardContainer';
import Footer from '@components/Footer';
import ReferralDashboard from '@components/ReferralDashboard';
import ReferralDashboardTopBar from '@components/topbars/ReferralDashboardTopBar';
import axios from 'axios';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';

export default function Index() {
  const [currentAccount, setCurrentAccount] = useState('');
  const [isError, setIsError] = useState(false);

  async function handleConnectWallet() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { ethereum } = window as any;

      if (!ethereum) {
        return;
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      const address = accounts[0];

      setCurrentAccount(address);

      const createAccount = await axios.post(
        '/api/cobogo/createAccountToFanOrYoutuber',
        {
          name: address,
        },
      );

      if (createAccount.data.data) {
        await axios.post('/api/cobogo/createWallet', {
          address,
          account: createAccount.data.data.id,
        });
      }
    } catch (error) {
      setIsError(true);
    }
  }

  const checkIfWalletIsConnected = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { ethereum } = window as any;

    try {
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        setCurrentAccount(account);
      }
    } catch (error) {
      setIsError(true);
    }
  }, []);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [checkIfWalletIsConnected]);

  return (
    <div className="w-full">
      <Head>
        <title>cobogo - referral dashboard</title>
      </Head>

      <ReferralDashboardContainer>
        <ReferralDashboardTopBar
          currentAccount={currentAccount}
          connectWallet={handleConnectWallet}
        />

        <ReferralDashboard
          currentAccount={currentAccount}
          isError={isError}
          setIsError={setIsError}
        />
      </ReferralDashboardContainer>

      <Footer />
    </div>
  );
}