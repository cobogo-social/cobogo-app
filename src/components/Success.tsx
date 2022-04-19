import ChannelBox from '@components/ChannelBox';
import StepContainer from '@components/StepContainer';
import StepSubContainer from '@components/StepSubContainer';
import JoinChannel from '@components/JoinChannel';
import Link from '@components/Link';
import Loading from '@components/Loading';
import YouWillBeNotified from '@components/YouWillBeNotified';
import StatsTopBar from '@components/StatsTopBar';
import Image from 'next/image';
import { useState } from 'react';

interface SuccessProps {
  banner: string;
  title: string;
  description: string;
  onboardedFriends: number;
  tokens: number;
}

export default function Success({
  banner,
  title,
  description,
  onboardedFriends,
  tokens,
}: SuccessProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Loading isLoading={isLoading} />

      <StepContainer>
        <StatsTopBar onboardedFriends={onboardedFriends} tokens={tokens} />

        <StepSubContainer>
          <div className="flex flex-col mb-8">
            <p className="flex mb-4 text-4xl">
              waitlist{' '}
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

            <Link href="/submit/invite">
              <button
                onClick={() => setIsLoading(true)}
                className="font-bold text-gray3 hover:cursor-pointer"
              >
                back to invite
              </button>
            </Link>
          </div>

          <ChannelBox banner={banner} title={title} description={description} />
        </StepSubContainer>
      </StepContainer>
    </>
  );
}
