import Image from 'next/image';

import Button from './Button';
import YouWillBeNotified from './YouWillBeNotified';

interface WaitlistProps {
  title: string;
}

export default function Waitlist({ title }: WaitlistProps) {
  return (
    <div className="flex flex-col mb-8">
      <p className="text-4xl text-white mb-4 flex">
        waitlist{' '}
        <span className="flex ml-4">
          <Image src="/images/success-icon.svg" width={34} height={34} />
        </span>
      </p>

      <p className="sm:text-xl text-white sm:w-[408px] mb-8">
        <span className="font-bold">cobogo</span> is a dApp still in
        development, but The channel <span className="font-bold">{title}</span>{' '}
        has been added to the waitlist.
      </p>

      <YouWillBeNotified />

      <a href="/submit/invite">
        <Button
          width="w-40"
          height="h-9"
          color="bg-blue"
          hoverColor="brightness-90"
          text="back to invite"
        />
      </a>
    </div>
  );
}
