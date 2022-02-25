import Link from 'next/link';

import Button from './Button';

export default function VerifiedVideoContainer() {
  return (
    <div className="flex flex-col">
      <p className="text-4xl text-green mb-4">verified!</p>

      <p className="text-xl text-white w-[408px] mb-12">
        there is a video on your channel that meet the rules.
      </p>

      <Link href="/submit/connect-wallet">
        <a>
          <Button
            width="w-28"
            height="h-9"
            color="bg-blue"
            hoverColor="brightness-90"
            text="next step"
          />
        </a>
      </Link>
    </div>
  );
}
