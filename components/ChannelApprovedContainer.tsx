import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';

export default function ChannelApprovedContainer() {
  return (
    <div className="flex flex-col">
      <p className="text-4xl text-green mb-4">channel approved</p>
      <p className="text-xl text-white w-[408px] mb-12">
        the channel <span className="font-bold">Space Official</span> has been
        approved and is already visible.
      </p>

      <div className="mb-7">
        <Button
          width="w-28"
          height="h-9"
          color="bg-blue"
          hoverColor="brightness-90"
          text="next step"
          fontSize=""
        />
      </div>

      <Link href="https://www.youtube.com/">
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-blue"
        >
          see my channel
        </a>
      </Link>
    </div>
  );
}
