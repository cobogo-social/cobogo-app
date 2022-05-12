import Footer from '@components/Footer';
import MobileSubmitMenu from '@components/MobileSubmitMenu';
import PageContainer from '@components/PageContainer';
import StartSubmission from '@components/StartSubmission';
import StepsMenu from '@components/StepsMenu';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Index() {
  const { query } = useRouter();

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

        {/* TODO: remove all first components equal to this */}
        <StartSubmission />

        <Footer />
      </PageContainer>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
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
};
