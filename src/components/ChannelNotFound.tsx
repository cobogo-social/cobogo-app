import { signOut } from 'next-auth/react';
import Image from 'next/image';

import StepContainer from './StepContainer';
import TopBar from './TopBar';

interface ChannelNotFoundProps {
  setHaveChannel?: () => void;
}

export default function ChannelNotFound({
  setHaveChannel,
}: ChannelNotFoundProps) {
  async function handleTryAnotherAccount() {
    await signOut();
    setHaveChannel();
  }

  return (
    <StepContainer>
      <TopBar />

      <div className="flex flex-col justify-center items-start pl-16 sm:px-16 2xl:px-64 mt-32 sm:mt-0">
        <div className="flex flex-col sm:flex-row items-start w-full justify-between">
          <div className="block sm:hidden">
            <Image
              src="/images/cobogo-blocks.svg"
              width={92}
              height={64}
              alt="cobogo blocks"
            />
          </div>

          <div>
            <p className="text-4xl text-white mb-4 flex">
              channel not found{' '}
              <span className="flex ml-4">
                <Image
                  src="/images/warning-icon.svg"
                  width={34}
                  height={34}
                  alt="warning icon"
                />
              </span>
            </p>

            <p className="text-lg text-white mb-8">
              there is no channel associated with this account.
            </p>

            <button
              onClick={handleTryAnotherAccount}
              className="text-blue font-bold hover:cursor-pointer"
            >
              try another account
            </button>
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
