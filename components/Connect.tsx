import Image from 'next/image';

import SignInButton from './SignInButton';
import StepContainer from './StepContainer';
import TopBar from './TopBar';

export default function Connect() {
  return (
    <StepContainer>
      <TopBar />

      <div className="flex flex-col justify-center items-start pl-16 sm:px-16 2xl:px-64 mt-16 sm:mt-0">
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
            <p className="text-4xl text-white mb-4">connect</p>

            <p className="text-lg text-white mb-8">
              connect your YouTube account and channel.
            </p>

            <SignInButton />
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
