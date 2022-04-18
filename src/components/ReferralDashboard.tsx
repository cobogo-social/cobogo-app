import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import ErrorModal from './ErrorModal';
import Loading from './Loading';
import ReferralDashboardBand from './ReferralDashboardBand';
import ReferralDashboardReferralLink from './ReferralDashboardReferralLink';

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
        .get('/api/cobogo/readAccountByName', {
          params: {
            name: currentAccount,
          },
        })
        .then((response) => {
          if (response.data.data) {
            const profiles = response.data.data
              ? response.data.data.attributes.profiles.data
              : [];

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
      <ErrorModal isError={isError} setIsError={setIsError} />

      <div className="flex flex-col items-center w-full">
        <div className="flex w-full flex-col items-start px-[204px]">
          <p className="text-[40px] mb-[31px]">invite YouTubers</p>

          <p className="text-[22px] mb-[44px]">
            you can earn 50 CBG for each Creator that joins the waitlist using
            your referral link!
          </p>

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
