import ChannelBox from '@components/ChannelBox';
import StepContainer from '@components/StepContainer';
import StepSubContainer from '@components/StepSubContainer';
import Link from '@components/Link';
import Loading from '@components/Loading';
import ShareLinks from '@components/ShareLinks';
import MobileReferralLink from '@components/MobileReferralLink';
import ReferralLink from '@components/ReferralLink';
import StatsTopBar from '@components/StatsTopBar';
import { useState } from 'react';

interface InviteProps {
  banner: string;
  title: string;
  description: string;
  referralCode: string;
  onboardedFriends: number;
  tokens: number;
}

export default function Invite({
  banner,
  title,
  description,
  referralCode,
  onboardedFriends,
  tokens,
}: InviteProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Loading isLoading={isLoading} />

      <StepContainer>
        <StatsTopBar onboardedFriends={onboardedFriends} tokens={tokens} />

        <StepSubContainer>
          <div className="flex flex-col">
            <p className="mb-4 text-4xl">congrats!</p>

            <p className="sm:text-lg mb-8 sm:w-[408px]">
              you are now on the waitlist and eligible to earn{' '}
              <span className="font-bold">100 CBG</span> tokens, which is
              equivalent to <span className="font-bold">$60</span> in the public
              sale!
            </p>

            <p className="text-xs sm:text-sm mb-8 sm:w-[408px]">
              you can earn more <span className="font-bold">50 CBG</span> for
              each Creator that joins the waitlist using your referral link, an
              they will earn rewards too.
            </p>

            <ReferralLink referralCode={referralCode} />

            <MobileReferralLink referralCode={referralCode} />

            <p className="mb-8 sm:text-lg">
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

            <div className="mb-8">
              <ShareLinks referralCode={referralCode} />
            </div>

            <Link href="/submit/success">
              <button
                onClick={() => setIsLoading(true)}
                className="font-bold text-gray3 hover:cursor-pointer"
              >
                skip
              </button>
            </Link>
          </div>

          <ChannelBox banner={banner} title={title} description={description} />
        </StepSubContainer>
      </StepContainer>
    </>
  );
}
