import Image from 'next/image';
import SignInButton from './SignInButton';
import TopBar from './TopBar';

export default function Connect() {
  return (
    <div className="bg-primary w-full h-full p-8">
      <TopBar />
      <div className="flex flex-col justify-center items-start px-16 2xl:px-64">
        <div className="flex items-start w-full justify-between">
          <div>
            <p className="text-4xl text-white mb-4">connect</p>
            <p className="text-lg text-white mb-12">
              connect your YouTube account and channel.
            </p>

            <div className="mb-40">
              <SignInButton />
            </div>
          </div>

          <Image
            src="/images/cobogo-blocks.svg"
            width={281}
            height={195}
            alt="cobogo blocks"
          />
        </div>
      </div>
    </div>
  );
}
