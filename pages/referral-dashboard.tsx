import Footer from '@components/Footer';
import MobileTopBar from '@components/MobileTopBar';
import ReferralDashboard from '@components/ReferralDashboard';
import ReferralDashboardContainer from '@components/ReferralDashboardContainer';
import ReferralDashboardTopBar from '@components/ReferralDashboardTopBar';
import axios from 'axios';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';

export default function Index() {
  const [currentAccount, setCurrentAccount] = useState('');
  const [isError, setIsError] = useState(false);
  const [onboardedFriends, setOnboardedFriends] = useState(0);
  const [referralCode, setReferralCode] = useState('');
  const [tokens, setTokens] = useState(0);
  const [channels, setChannels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function connectMetaMaskWallet() {
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

  const handleGetChannels = useCallback(async () => {
    setIsLoading(true);

    if (currentAccount) {
      await axios
        .get('/api/cobogo/readAccountByNameOrYoutubeAccountId', {
          params: {
            name: currentAccount,
          },
        })
        .then((response) => {
          if (response.data.data) {
            const affiliates = response.data.data.attributes.affiliates.data;

            console.log(response.data.data.attributes.affiliates);
            setOnboardedFriends(affiliates.length);
            setReferralCode(response.data.data.attributes.referral_code);
            setTokens(response.data.data.attributes.tokens);

            if (affiliates.length) {
              affiliates.forEach(async (affiliate) => {
                await axios
                  .get('/api/cobogo/readAccountById', {
                    params: {
                      id: affiliate.id,
                    },
                  })
                  .then((channel) => {
                    setChannels((c) => [...c, channel.data.data.attributes]);
                    setIsLoading(false);
                  });
              });
            } else {
              setIsLoading(false);
            }
          } else {
            setIsLoading(false);
          }
        });
    } else {
      setIsLoading(false);
    }
  }, [currentAccount]);

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
    handleGetChannels();
  }, [currentAccount, handleGetChannels]);

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
          setCurrentAccount={setCurrentAccount}
          currentAccount={currentAccount}
          connectWallet={connectMetaMaskWallet}
          setChannels={setChannels}
        />

        <MobileTopBar
          connectWallet={connectMetaMaskWallet}
          currentAccount={currentAccount}
        />

        <ReferralDashboard
          currentAccount={currentAccount}
          isError={isError}
          setIsError={setIsError}
          isLoading={isLoading}
          referralCode={referralCode}
          onboardedFriends={onboardedFriends}
          channels={channels}
          tokens={tokens}
        />
      </ReferralDashboardContainer>

      <Footer />
    </div>
  );
}
