import Footer from '@components/Footer';
import MobileMenu from '@components/MobileMenu';
import PageWrapper from '@components/PageWrapper';
import StartSubmission from '@components/StartSubmission';
import Steps from '@components/Steps';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
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
      <Head>
        <title>cobogo - submit</title>
      </Head>

      <PageWrapper>
        <Steps />

        <MobileMenu noSteps noLogout />

        <StartSubmission />

        <Footer />
      </PageWrapper>
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
