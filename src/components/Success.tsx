import ChannelBox from '@components/ChannelBox';
import JoinChannel from '@components/JoinChannel';
import Link from '@components/Link';
import Loading from '@components/Loading';
import StepContainer from '@components/StepContainer';
import StepSubContainer from '@components/StepSubContainer';
import YouWillBeNotified from '@components/YouWillBeNotified';
import Image from 'next/image';
import { useState } from 'react';

import SubmitStatsTopBar from './SubmitStatsTopBar';

interface SuccessProps {
  bannerImage: string;
  title: string;
  youtubeDescription: string;
  onboardedFriends: number;
  tokens: number;
}

export default function Success({
  bannerImage,
  title,
  youtubeDescription,
  onboardedFriends,
  tokens,
}: SuccessProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Loading isLoading={isLoading} />

      <StepContainer>
        <SubmitStatsTopBar
          onboardedFriends={onboardedFriends}
          tokens={tokens}
        />

        <StepSubContainer>
          <div className="flex flex-col mb-8">
            <p className="flex mb-4 text-4xl">
              whitelisted{' '}
              <span className="flex ml-4">
                <Image
                  src="/images/success-icon.svg"
                  width={34}
                  height={34}
                  alt="success icon"
                />
              </span>
            </p>

            <p className="sm:text-xl sm:w-[408px] mb-8">
              now you are eligible to join an exclusive{' '}
              <span className="font-bold">channel</span> for Content Creators!
              Be a pioneer in the first Content Creator{' '}
              <span className="font-bold">DAO</span>!
            </p>

            <p className="text-xs sm:text-sm mb-8 sm:w-[408px]">
              <span className="font-bold">cobogo</span> is a dApp still in
              development, but the channel{' '}
              <span className="font-bold">{title}</span> has been added to the
              waitlist.
            </p>

            <YouWillBeNotified />

            <JoinChannel />

            <Link href="/submit/invite-and-share">
              <button
                onClick={() => setIsLoading(true)}
                className="font-bold text-gray3 hover:cursor-pointer"
              >
                back to invite and share
              </button>
            </Link>
          </div>

          <ChannelBox
            banner={bannerImage}
            title={title}
            description={youtubeDescription}
          />
        </StepSubContainer>
      </StepContainer>
    </>
  );
}
