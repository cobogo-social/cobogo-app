import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import SignInButton from './SignInButton';
import TopBar from './TopBar';

interface ConnectProps {
  haveChannel: boolean;
}

export default function Connect({ haveChannel }: ConnectProps) {
  const { push } = useRouter();

  return (
    <div className="bg-primary w-full h-screen sm:h-full p-8">
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
            {haveChannel ? (
              <>
                <p className="text-4xl text-white mb-4">connect</p>

                <p className="text-lg text-white mb-8">
                  connect your YouTube account and channel.
                </p>

                <SignInButton />
              </>
            ) : (
              <>
                <p className="text-4xl text-white mb-4 flex">
                  connect{' '}
                  <div className="flex ml-4">
                    <Image
                      src="/images/warning-icon.svg"
                      width={34}
                      height={34}
                    />
                  </div>
                </p>

                <p className="text-lg text-white mb-8">
                  there is no channel associated with this account.
                </p>

                <a
                  onClick={() => {
                    signOut();
                    push('/submit/connect');
                  }}
                  className="text-blue font-bold hover:cursor-pointer"
                >
                  try another account
                </a>
              </>
            )}
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
    </div>
  );
}
