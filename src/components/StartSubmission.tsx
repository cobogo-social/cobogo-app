import Button from './Button';
import JoinOurWaitlist from './JoinOurWaitlist';
import Link from './Link';
import StepContainer from './StepContainer';
import TopBar from './TopBar';

export default function StartSubmission() {
  return (
    <StepContainer>
      <TopBar />

      <div className="flex flex-col justify-center items-center mt-32 sm:mt-0">
        <p className="text-white sm:text-2xl sm:w-[618px] text-center mb-16">
          to offer the best experience in{' '}
          <span className="font-bold">Web3 YouTube monetization</span>, we are
          growing our community of Creators.
        </p>

        <JoinOurWaitlist />

        <Link href="/submit/connect" className="mb-8">
          <Button
            text="start submission"
            color="bg-purple"
            hoverColor="brightness-90"
            width="w-48"
            height="h-12"
            fontSize="text-xl"
          />
        </Link>

        <p className="text-white text-center mb-2">
          if you have any questions about the onboarding process:
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center">
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
  );
}
