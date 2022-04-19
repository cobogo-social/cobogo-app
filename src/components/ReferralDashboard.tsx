import ErrorModal from '@components/ErrorModal';
import Loading from '@components/Loading';
import ReferralDashboardBand from '@components/ReferralDashboardBand';
import ReferralDashboardReferralLink from '@components/ReferralDashboardReferralLink';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import MobileReferralLink from './MobileReferralLink';

interface ReferralDashboardProps {
  currentAccount: string;
  isError: boolean;
  setIsError: (value: boolean) => void;
}

export default function ReferralDashboard({
  currentAccount,
  isError,
  setIsError,
}: ReferralDashboardProps) {
  const [onboardedFriends, setOnboardedFriends] = useState(0);
  const [referralCode, setReferralCode] = useState('');
  const [tokens, setTokens] = useState(0);
  const [channels, setChannels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
            const profiles = response.data.data.attributes.profiles.data;

            setOnboardedFriends(
              response.data.data.attributes.profiles.data.length,
            );
            setReferralCode(response.data.data.attributes.referral_code);
            setTokens(response.data.data.attributes.tokens);

            if (profiles.length) {
              profiles.forEach(async (profile) => {
                await axios
                  .get('/api/cobogo/readProfileById', {
                    params: {
                      id: profile.id,
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

  useEffect(() => {
    handleGetChannels();
  }, [currentAccount, handleGetChannels]);

  return (
    <>
      <Loading isLoading={isLoading} />
      <ErrorModal isOpen={isError} setIsOpen={setIsError} />

      <div className="flex flex-col items-center w-full pt-[93px]">
        <div className="flex w-full flex-col items-start px-[30px] sm:px-[204px]">
          <p className="text-[26px] sm:text-[40px] mb-[14px] sm:mb-[31px]">
            invite YouTubers
          </p>

          <p className="sm:text-[22px] mb-[14px] sm:mb-[44px]">
            you can earn 50 CBG for each Creator that joins the waitlist using
            your referral link!
          </p>

          <MobileReferralLink referralCode={referralCode} />

          <ReferralDashboardReferralLink
            referralCode={referralCode}
            currentAccount={currentAccount}
          />

          <p className="mb-[80px] sm:text-lg">
            <a
              href="https://docs.cobogo.social/overview/getting-started/referral-program"
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
          channels={channels}
          currentAccount={currentAccount}
          tokens={tokens}
        />
      </div>
    </>
  );
}
