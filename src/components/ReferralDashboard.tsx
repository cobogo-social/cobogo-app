import ErrorModal from '@components/ErrorModal';
import Loading from '@components/Loading';
import ReferralDashboardBand from '@components/ReferralDashboardBand';
import ReferralDashboardReferralLink from '@components/ReferralDashboardReferralLink';

import MobileReferralLink from './MobileReferralLink';

interface ReferralDashboardProps {
  currentAccount: string;
  isError: boolean;
  setIsError: (value: boolean) => void;
  isLoading: boolean;
  referralCode: string;
  onboardedFriends: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  channels: any[];
  tokens: number;
}

export default function ReferralDashboard({
  currentAccount,
  isError,
  setIsError,
  isLoading,
  referralCode,
  onboardedFriends,
  channels,
  tokens,
}: ReferralDashboardProps) {
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
