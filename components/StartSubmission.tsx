import Link from 'next/link';
import { useRouter } from 'next/router';

import Button from './Button';
import JoinOurWaitlist from './JoinOurWaitlist';
import TopBar from './TopBar';

export default function StartSubmission() {
  const { query } = useRouter();

  return (
    <div className="bg-primary w-full h-screen sm:h-full p-8">
      <TopBar />

      <div className="flex flex-col justify-center items-center mt-32 sm:mt-0">
        <p className="text-white sm:text-2xl sm:w-[618px] text-center mb-8">
          to offer the best experience in{' '}
          <span className="font-bold">Web3 YouTube monetization</span>, we are
          growing our community of Creators.
        </p>

        <JoinOurWaitlist />

        <Link
          href={
            query.ref ? `/submit/connect?ref=${query.ref}` : `/submit/connect`
          }
        >
          <a className="mb-8">
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
