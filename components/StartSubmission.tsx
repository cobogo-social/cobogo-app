import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Button from './Button';
import TopBar from './TopBar';

export default function StartSubmission() {
  const { query } = useRouter();

  return (
    <div className="bg-primary w-full h-screen sm:h-full p-8">
      <TopBar />

      <div className="flex flex-col justify-center items-center mt-32 sm:mt-0">
        <div className="mb-12">
          <Image
            src="/images/cobogo-block.svg"
            width={84}
            height={73}
            alt="cobogo block"
          />
        </div>

        <p className="text-white sm:text-xl sm:w-[618px] text-center mb-12">
          to offer the best experience in{' '}
          <span className="font-bold">Web3 YouTube monetization</span>, we are
          growing our community of Creators.{' '}
          <span className="font-bold text-blue">Learn more</span> about{' '}
          <span className="font-bold">cobogo social</span> and apply your
          YouTube channel
        </p>

        <Link
          href={
            query.ref ? `/submit/connect?ref=${query.ref}` : `/submit/connect`
          }
        >
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

        <p className="text-white text-center mb-2">
          if you have any questions about the onboarding process:
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center">
          <Link href="https://docs.cobogo.social/project/introduction">
            <a target="_blank" rel="noopener noreferrer">
              <p className="font-bold text-blue sm:mr-8">our documentation</p>
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
