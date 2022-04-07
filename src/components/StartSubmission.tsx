import { useState } from 'react';

import Button from './Button';
import JoinOurWaitlist from './JoinOurWaitlist';
import Link from './Link';
import Loading from './Loading';
import StepContainer from './StepContainer';
import TopBar from './TopBar';

export default function StartSubmission() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Loading isLoading={isLoading} />

      <StepContainer>
        <TopBar />

        <div className="flex flex-col items-center justify-center mt-32 sm:mt-0">
          <p className="sm:text-2xl sm:w-[618px] text-center mb-[50px]">
            revolutionize the way you{' '}
            <span className="font-bold">monetize</span> your{' '}
            <span className="font-bold">channel</span> using the tools made
            possible by <span className="font-bold">blockchain</span> and{' '}
            <span className="font-bold">cobogo</span>
          </p>

          <JoinOurWaitlist />

          <Link href="/submit/connect" className=" mb-[100px]">
            <Button
              text="join now"
              color="bg-purple"
              hoverColor="brightness-90"
              width="w-[147px]"
              height="h-[50px]"
              fontSize="text-xl"
              onClick={() => setIsLoading(true)}
            />
          </Link>

          <p className="mb-2 text-center">
            if you have any questions about the onboarding process:
          </p>

          <div className="flex flex-col items-center justify-center sm:flex-row">
            <a
              href="https://docs.cobogo.social"
              className="font-bold text-blue sm:mr-8"
              target="_blank"
              rel="noopener noreferrer"
            >
              our documentation
            </a>

            <a
              href="https://t.me/cobogosocial"
              className="font-bold text-blue"
              target="_blank"
              rel="noopener noreferrer"
            >
              talk to an expert
            </a>
          </div>
        </div>
      </StepContainer>
    </>
  );
}
