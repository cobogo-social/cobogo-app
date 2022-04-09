import Image from 'next/image';

import StepItem from './StepItem';

export default function Steps() {
  return (
    <div className="bg-secondary p-8 w-full h-[870px] hidden sm:block">
      <div className="mb-16">
        <Image src="/images/logo.svg" width={120} height={27} alt="logo" />
      </div>

      <p className="mb-8 text-2xl text-white">submit a channel</p>

      <StepItem number="1" text="connect" href="/submit/connect" />

      <StepItem
        number="2"
        text="create profile"
        href="/submit/create-profile"
      />

      <StepItem number="3" text="video" href="/submit/video" />

      <StepItem number="4" text="invite" href="/submit/invite" />

      <StepItem number="5" text="success" href="/submit/success" />
    </div>
  );
}
