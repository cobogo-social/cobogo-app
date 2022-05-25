import Button from '@components/Button';
import Footer from '@components/Footer';
import JoinOurWaitlist from '@components/JoinOurWaitlist';
import Link from '@components/Link';
import MobileSubmitMenu from '@components/MobileSubmitMenu';
import PageContainer from '@components/PageContainer';
import StepContainer from '@components/StepContainer';
import StepsMenu from '@components/StepsMenu';
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

  return (
    <div className="w-full">
      <PageContainer>
        <StepsMenu />

        <MobileSubmitMenu noSteps noLogout />

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
                width="w-[147px]"
                height="h-[50px]"
                fontSize="text-xl"
                onClick={() => setLoading(true)}
              />
            </Link>

            <p className="mb-2 text-center">
              if you have any questions about the onboarding process:
            </p>

            <div className="flex flex-col items-center justify-center sm:flex-row">
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

        <Footer />
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
  }

  return {
    props: {},
  };
};
