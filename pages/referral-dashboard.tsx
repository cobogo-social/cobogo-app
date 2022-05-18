import ErrorModal from '@components/ErrorModal';
import Footer from '@components/Footer';
import MobileMainMenu from '@components/MobileMainMenu';
import MobileReferralLink from '@components/MobileReferralLink';
import ReferralDashboardBand from '@components/ReferralDashboardBand';
import ReferralDashboardContainer from '@components/ReferralDashboardContainer';
import ReferralDashboardReferralLink from '@components/ReferralDashboardReferralLink';
import ReferralDashboardTopBar from '@components/ReferralDashboardTopBar';
import { LoadingContext } from '@contexts/LoadingContext';
import axios from 'axios';
import Head from 'next/head';
import { useCallback, useContext, useEffect, useState } from 'react';

export default function Index() {
  const [currentAccount, setCurrentAccount] = useState('');
  const [isError, setIsError] = useState(false);
  const [onboardedFriends, setOnboardedFriends] = useState(0);
  const [pendingFriends, setPendingFriends] = useState(0);
  const [referralCode, setReferralCode] = useState('');
  const [tokens, setTokens] = useState(0);
  const [onboardedFriendsChannels, setOnboardedFriendsChannels] = useState([]);
  const [pendingFriendsChannels, setPendingFriendsChannels] = useState([]);
  const { setLoading } = useContext(LoadingContext);

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
      console.error(error);
    }
  }

  const getInfo = useCallback(async () => {
    setLoading(true);

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

            setLoading(false);
          } else {
            setLoading(false);
          }
        });
    } else {
      setLoading(false);
    }
  }, [currentAccount, setLoading]);

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
    <>
      <ErrorModal isOpen={isError} setIsOpen={setIsError} />

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

          <div className="flex flex-col items-center w-full pt-[93px]">
            <div className="flex w-full flex-col items-start px-[30px] sm:px-[204px]">
              <p className="text-[26px] sm:text-[40px] mb-[14px] sm:mb-[31px]">
                invite YouTubers
              </p>

              <p className="sm:text-[22px] mb-[14px] sm:mb-[44px]">
                you can earn 50 CBG for each Creator that joins the waitlist
                using your referral link!
              </p>

              <MobileReferralLink referralCode={referralCode} />

              <ReferralDashboardReferralLink
                referralCode={referralCode}
                currentAccount={currentAccount}
              />

              <p className="mb-[80px] sm:text-lg">
                <a
                  href="https://docs.cobogo.social/youtubers/referral-program"
                  className="font-bold text-blue"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  learn more
                </a>{' '}
                about our <span className="font-bold">Referral Program.</span>
              </p>
            </div>

            <ReferralDashboardBand
              onboardedFriends={onboardedFriends}
              pendingFriends={pendingFriends}
              onboardedFriendsChannels={onboardedFriendsChannels}
              pendingFriendsChannels={pendingFriendsChannels}
              currentAccount={currentAccount}
              tokens={tokens}
            />
          </div>
        </ReferralDashboardContainer>

        <Footer />
      </div>
    </>
  );
}
