import Footer from '@components/Footer';
import ReferralDashboard from '@components/ReferralDashboard';
import ReferralDashboardTopBar from '@components/ReferralDashboardTopBar';
import ReferralDashboardWrapper from '@components/ReferralDashboardWrapper';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';

export default function Index() {
  const [currentAccount, setCurrentAccount] = useState('');

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
      console.log(error);
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

      <ReferralDashboardWrapper>
        <ReferralDashboardTopBar currentAccount={currentAccount} />

        <ReferralDashboard />
      </ReferralDashboardWrapper>

      <Footer />
    </div>
  );
}
