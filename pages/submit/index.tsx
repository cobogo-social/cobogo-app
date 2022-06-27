import Button from '@components/Button';
import JoinOurWaitlist from '@components/JoinOurWaitlist';
import Link from '@components/Link';
import PageContainer from '@components/PageContainer';
import StepContainer from '@components/StepContainer';
import Steps from '@components/Steps';
import TopBar from '@components/TopBar';
import { LoadingContext } from '@contexts/LoadingContext';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

export default function Index() {
  const { query } = useRouter();
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    if (query.ref) {
      sessionStorage.setItem('queryRef', query.ref as string);
    }
  }, [query]);

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return (
    <div className="w-full">
      <PageContainer>
        <Steps />

        <StepContainer>
          <TopBar
            noOnboardedFriends
            noLogo
            noSteps
            noLogout
            noConnectWallet
            noTokens
          />

          <div className="flex flex-col items-center justify-center mt-32 sm:mt-0 px-8 py-4">
            <p className="text-3xl max-w-[668px] text-center mb-12">
              revolutionize the way you{' '}
              <span className="font-bold">monetize</span> your{' '}
              <span className="font-bold">channel</span> using the tools made
              possible by <span className="font-bold">blockchain</span> and{' '}
              <span className="font-bold">cobogo</span>
            </p>

            <JoinOurWaitlist />

            <Link href="/submit/connect" className="mb-24">
              <Button
                text="join now"
                color="bg-blue"
                width="w-[147px]"
                height="h-[50px]"
                fontSize="text-xl"
                onClick={() => setLoading(true)}
              />
            </Link>

            <p className="mb-2 text-center text-lg">
              if you have any questions about the onboarding process:
            </p>

            <div className="flex flex-col items-center justify-center sm:flex-row mb-56">
              <a
                href="https://docs.cobogo.social/youtubers/getting-started"
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
      </PageContainer>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const session = await getSession({ req });

    if (session?.user) {
      return {
        redirect: {
          destination: '/submit/connect',
          permanent: false,
        },
      };
    }

    return {
      props: {},
    };
  } catch (error) {
    console.error(error.message);

    return {
      props: {},
    };
  }
};
