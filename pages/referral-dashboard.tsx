import ReferralDashboardBand from '@components/ReferralDashboardBand';
import ReferralDashboardContainer from '@components/ReferralDashboardContainer';
import ReferralDashboardReferralLink from '@components/ReferralDashboardReferralLink';
import TopBar from '@components/TopBar';
import { LoadingContext } from '@contexts/LoadingContext';
import { MesssageContext } from '@contexts/MessageContext';
import { WalletContext } from '@contexts/WalletContext';
import axios from 'axios';
import Head from 'next/head';
import { useCallback, useContext, useEffect, useState } from 'react';

export default function Index() {
  const { currentWallet } = useContext(WalletContext);
  const { setMessage } = useContext(MesssageContext);
  const [onboardedFriends, setOnboardedFriends] = useState(0);
  const [pendingFriends, setPendingFriends] = useState(0);
  const [referralCode, setReferralCode] = useState('');
  const [tokens, setTokens] = useState(0);
  const [onboardedFriendsChannels, setOnboardedFriendsChannels] = useState([]);
  const [pendingFriendsChannels, setPendingFriendsChannels] = useState([]);
  const { setLoading } = useContext(LoadingContext);

  const getInfo = useCallback(async () => {
    try {
      setLoading(true);

      if (currentWallet) {
        await axios
          .get('/api/cobogo/readAccountByWallet', {
            params: {
              walletAddress: currentWallet,
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
    } catch (error) {
      setLoading(false);
      setMessage({
        text: error.message,
        type: 'error',
      });
    }
  }, [currentWallet, setMessage, setLoading]);

  useEffect(() => {
    getInfo();
  }, [getInfo]);

  return (
    <div className="w-full">
      <Head>
        <title>cobogo - referral dashboard</title>
      </Head>

      <ReferralDashboardContainer>
        <TopBar
          setOnboardedFriendsChannels={setOnboardedFriendsChannels}
          setPendingFriendsChannels={setPendingFriendsChannels}
          noOnboardedFriends
          noTokens
          referralCode={referralCode}
        />

        <div className="flex flex-col items-center w-full pt-[93px]">
          <div className="flex w-full flex-col items-start px-[30px] sm:px-[204px]">
            <p className="text-[26px] sm:text-[40px] mb-[14px] sm:mb-[31px]">
              invite YouTubers
            </p>

            <p className="sm:text-[22px] mb-[14px] sm:mb-[44px]">
              you can earn 50 CBG for each Creator that joins the whitelist
              using your referral link!
            </p>

            <ReferralDashboardReferralLink referralCode={referralCode} />

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
            tokens={tokens}
          />
        </div>
      </ReferralDashboardContainer>
    </div>
  );
}
