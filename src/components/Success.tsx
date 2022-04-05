import Image from 'next/image';
import { useState } from 'react';

import ChannelBanner from './ChannelBanner';
import JoinChannel from './JoinChannel';
import Link from './Link';
import Loading from './Loading';
import StatsTopBar from './StatsTopBar';
import StepContainer from './StepContainer';
import StepWrapper from './StepWrapper';
import YouWillBeNotified from './YouWillBeNotified';

interface SuccessProps {
  banner: string;
  title: string;
  description: string;
  onboardedFriends: number;
}

export default function Success({
  banner,
  title,
  description,
  onboardedFriends,
}: SuccessProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Loading isLoading={isLoading} />

      <StepContainer>
        <StatsTopBar onboardedFriends={onboardedFriends} />

        <StepWrapper>
          <div className="flex flex-col mb-8">
            <p className="text-4xl text-white mb-4 flex">
              waitlist{' '}
              <span className="flex ml-4">
                <Image src="/images/success-icon.svg" width={34} height={34} />
              </span>
            </p>

            <p className="sm:text-xl text-white sm:w-[408px] mb-8">
              now you are eligible to join an exclusive{' '}
              <span className="font-bold">channel</span> for Content Creators!
              Be a pioneer in the first Content Creator{' '}
              <span className="font-bold">DAO</span>!
            </p>

            <p className="text-xs sm:text-sm text-white mb-8 sm:w-[408px]">
              <span className="font-bold">cobogo</span> is a dApp still in
              development, but the channel{' '}
              <span className="font-bold">{title}</span> has been added to the
              waitlist.
            </p>

            <YouWillBeNotified />

            <JoinChannel />

            <Link href="/submit/invite">
              <button
                onClick={() => setIsLoading(true)}
                className="text-graylight font-bold hover:cursor-pointer"
              >
                back to invite
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
