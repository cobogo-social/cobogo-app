import StepContainer from '@components/StepContainer';
import { signOut } from 'next-auth/react';
import Image from 'next/image';

import TopBar from './TopBar';

interface ChannelNotFoundProps {
  setHaveChannel?: () => void;
}

export default function ChannelNotFound({
  setHaveChannel,
}: ChannelNotFoundProps) {
  async function tryAnotherAccount() {
    await signOut();
    setHaveChannel();
  }

  return (
    <StepContainer>
      <TopBar noOnboardedFriends noLogo noLogout noConnectWallet noTokens />

      <div className="flex flex-col items-start justify-center pl-16 mt-32 sm:px-16 2xl:px-64 sm:mt-0">
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
            <p className="flex mb-4 text-4xl">
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

            <p className="mb-8 text-lg">
              there is no channel associated with this account.
            </p>

            <button
              onClick={tryAnotherAccount}
              className="font-bold text-blue hover:cursor-pointer"
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
