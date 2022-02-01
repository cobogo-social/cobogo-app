import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';
import TopBar from './TopBar';

export default function StartSubmission() {
  return (
    <div className="bg-primary w-full h-full p-8">
      <TopBar />

      <div className="flex flex-col justify-center items-center">
        <div className="mb-12">
          <Image
            src="/images/cobogo-block.svg"
            width={84}
            height={73}
            alt="cobogo block"
          />
        </div>

        <p className="text-white text-xl w-[618px] text-center mb-12">
          to offer the best experience in{' '}
          <span className="font-bold">Web3 YouTube monetization</span>, we are
          growing our community of Creators.{' '}
          <span className="font-bold text-blue">Learn more</span> about{' '}
          <span className="font-bold">cobogo social</span> and apply your
          YouTube channel
        </p>

        <Link href="/submit/connect">
          <a className="mb-28">
            <Button
              text="start submission"
              color="bg-purple"
              hoverColor="brightness-90"
              width="w-48"
              height="h-12"
              fontSize="text-xl"
            />
          </a>
        </Link>

        <p className="text-white">
          if you have any questions about the onboarding process:
        </p>
        <div className="flex">
          <Link href="https://docs.cobogo.social/project/introd uction">
            <a target="_blank" rel="noopener noreferrer">
              <p className="font-bold text-blue mr-8">our documentation</p>
            </a>
          </Link>
          <Link href="https://t.me/cobogosocial">
            <a target="_blank" rel="noopener noreferrer">
              <p className="font-bold text-blue">talk to an expert</p>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
