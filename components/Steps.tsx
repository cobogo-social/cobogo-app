import Image from 'next/image';
import Link from 'next/link';
import StepItem from './StepItem';

export default function Steps() {
  return (
    <div className="bg-secondary p-8 w-full h-full">
      <div className="mb-16">
        <Link href="/">
          <a>
            <Image src="/images/logo.svg" width={120} height={27} alt="logo" />
          </a>
        </Link>
      </div>

      <p className="text-white mb-8 text-2xl">submit a channel</p>

      <StepItem number="1" text="connect" />
      <StepItem number="2" text="create profile" />
      <StepItem number="3" text="review" />
      <StepItem number="4" text="video" />
      <StepItem number="5" text="connect wallet" />
      <StepItem number="6" text="network" />
      <StepItem number="7" text="create pool" />
      <StepItem number="8" text="ready for staking" last />
    </div>
  );
}
