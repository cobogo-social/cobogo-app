import { useState } from 'react';

import ChannelBanner from './ChannelBanner';
import Link from './Link';
import Loading from './Loading';
import ReferralLink from './ReferralLink';
import ShareLinks from './ShareLinks';
import StatsTopBar from './StatsTopBar';
import StepContainer from './StepContainer';
import StepWrapper from './StepWrapper';

interface InviteProps {
  banner: string;
  title: string;
  description: string;
  referralCode: string;
  onboardedFriends: number;
}

export default function Invite({
  banner,
  title,
  description,
  referralCode,
  onboardedFriends,
}: InviteProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Loading isLoading={isLoading} />

      <StepContainer>
        <StatsTopBar onboardedFriends={onboardedFriends} />

        <StepWrapper>
          <div className="flex flex-col">
            <p className="text-4xl text-white mb-4">congrats!</p>

            <p className="text-base sm:text-lg text-white mb-8 sm:w-[408px]">
              you are now on the waitlist and eligible to earn{' '}
              <span className="font-bold">100 CBG</span> tokens, which is
              equivalent to <span className="font-bold">$60</span> in the public
              sale!
            </p>

            <p className="text-xs sm:text-sm text-white mb-8 sm:w-[408px]">
              you can earn more <span className="font-bold">50 CBG</span> for
              each Creator that joins the waitlist using your referral link, an
              they will earn rewards too.
            </p>

            <ReferralLink referralCode={referralCode} />

            <p className="text-white mb-8 text-lg">
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
                className="text-graylight font-bold hover:cursor-pointer"
              >
                skip
              </button>
            </Link>
          </div>

          <ChannelBanner
            banner={banner}
            title={title}
            description={description}
          />
        </StepWrapper>
      </StepContainer>
    </>
  );
}
