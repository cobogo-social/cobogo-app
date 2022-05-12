import Footer from '@components/Footer';
import MobileMainMenu from '@components/MobileMainMenu';
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
  const [pendingFriends, setPendingFriends] = useState(0);
  const [referralCode, setReferralCode] = useState('');
  const [tokens, setTokens] = useState(0);
  const [onboardedFriendsChannels, setOnboardedFriendsChannels] = useState([]);
  const [pendingFriendsChannels, setPendingFriendsChannels] = useState([]);
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

  const getInfo = useCallback(async () => {
    setIsLoading(true);

    if (currentAccount) {
      await axios
        .get('/api/cobogo/readAccountByNameOrYoutubeAccountId', {
          params: {
            name: currentAccount,
          },
        })
        .then(async (response) => {
          if (response.data.data) {
            const account = response.data.data;

            const accountsByReferralId = await axios.get(
              '/api/cobogo/readAccountsByReferralId',
              {
                params: {
                  referralId: account.id,
                },
              },
            );

            accountsByReferralId.data.data.forEach((accountByReferralId) => {
              if (
                accountByReferralId.attributes.profiles.data[0].attributes
                  .waitlist
              ) {
                setOnboardedFriendsChannels((c) => [
                  ...c,
                  accountByReferralId.attributes,
                ]);
              } else {
                setPendingFriendsChannels((c) => [
                  ...c,
                  accountByReferralId.attributes,
                ]);
              }

              const waitlisted =
                accountByReferralId.attributes.profiles.data[0].attributes
                  .waitlist;

              if (waitlisted) {
                setOnboardedFriends((c) => c + 1);
              } else {
                setPendingFriends((c) => c + 1);
              }
            });
            setReferralCode(response.data.data.attributes.referral_code);
            setTokens(response.data.data.attributes.tokens);

            setIsLoading(false);
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
    getInfo();
  }, [getInfo]);

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
          setOnboardedFriendsChannels={setOnboardedFriendsChannels}
          setPendingFriendsChannels={setPendingFriendsChannels}
        />

        <MobileMainMenu
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
          pendingFriends={pendingFriends}
          onboardedFriendsChannels={onboardedFriendsChannels}
          pendingFriendsChannels={pendingFriendsChannels}
          tokens={tokens}
        />
      </ReferralDashboardContainer>

      <Footer />
    </div>
  );
}
