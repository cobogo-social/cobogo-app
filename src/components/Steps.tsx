import StepItem from '@components/StepItem';
import Image from 'next/image';
import Link from './Link';

export default function Steps() {
  return (
    <div className="hidden w-full h-[945px] p-8 bg-secondary sm:block">
      <div className="mb-16">
        <Link href="/" className="flex">
          <Image src="/images/logo.svg" width={120} height={27} alt="logo" />
        </Link>
      </div>

      <p className="mb-8 text-2xl">submit a channel</p>

      <StepItem number="1" text="connect" href="/submit/connect" />

      <StepItem
        number="2"
        text="create profile"
        href="/submit/create-profile"
      />

      <StepItem
        number="3"
        text="connect wallet"
        href="/submit/connect-wallet"
      />

      <StepItem
        number="4"
        text="invite and share"
        href="/submit/invite-and-share"
      />

      <StepItem number="5" text="success" href="/submit/success" />
    </div>
  );
}
