import StepContainer from '@components/StepContainer';
import TopBar from '@components/TopBar';
import YoutubeSignInButton from '@components/YoutubeSignInButton';
import Image from 'next/image';

import TwitchSignInButton from './TwitchSignInButton';
import TwitterSignInButton from './TwitterSignInButton';

export default function Connect() {
  return (
    <StepContainer>
      <TopBar />

      <div className="flex flex-col items-start justify-center pl-16 mt-16 sm:px-16 2xl:px-64 sm:mt-0">
        <div className="flex flex-col items-start justify-between w-full sm:flex-row">
          <div className="block sm:hidden">
            <Image
              src="/images/cobogo-blocks.svg"
              width={92}
              height={64}
              alt="cobogo blocks"
            />
          </div>

          <div>
            <p className="mb-4 text-4xl">connect</p>

            <p className="mb-8 text-lg">
              connect your YouTube account and channel.
            </p>

            <div className="mb-4">
              <YoutubeSignInButton />
            </div>

            <div className="mb-4">
              <TwitchSignInButton />
            </div>

            <TwitterSignInButton />
          </div>

          <div className="hidden sm:block">
            <Image
              src="/images/cobogo-blocks.svg"
              width={281}
              height={195}
              alt="cobogo blocks"
            />
          </div>
        </div>
      </div>
    </StepContainer>
  );
}
