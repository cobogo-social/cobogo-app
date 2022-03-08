import Image from 'next/image';
import Link from 'next/link';

import Button from './Button';

interface WaitlistContainerProps {
  title: string;
}

export default function WaitlistContainer({ title }: WaitlistContainerProps) {
  return (
    <div className="flex flex-col mb-8">
      <p className="text-4xl text-white mb-4 flex">
        waitlist{' '}
        <div className="flex ml-4">
          <Image src="/images/success-icon.svg" width={34} height={34} />
        </div>
      </p>

      <p className="sm:text-xl text-white sm:w-[408px] mb-8">
        <span className="font-bold">cobogo</span> is a dApp still in
        development, but The channel <span className="font-bold">{title}</span>{' '}
        has been added to the waitlist.
      </p>

      <div className="flex h-[60px] justify-center items-center mb-8">
        <div className="w-[60px] h-[60px] sm:border-l-4 border-details flex justify-center items-center">
          <Image
            src="/images/notification-icon.svg"
            width={18}
            height={20}
            alt="notification icon"
          />
        </div>

        <p className="sm:w-[369px] font-bold text-white text-xs sm:text-base">
          you will be notified via the email registered on your YouTube account.
        </p>
      </div>

      <Link href="/submit/invite">
        <Button
          width="w-40"
          height="h-9"
          color="bg-blue"
          hoverColor="brightness-90"
          text="back to invite"
        />
      </Link>
    </div>
  );
}
