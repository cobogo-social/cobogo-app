import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Footer from '../../components/Footer';
import MobileTopBar from '../../components/MobileTopBar';
import PageWrapper from '../../components/PageWrapper';
import StartSubmission from '../../components/StartSubmission';
import Steps from '../../components/Steps';

export default function Index() {
  const { query } = useRouter();

  useEffect(() => {
    sessionStorage.setItem('queryRef', query.ref as string);
  }, []);

  return (
    <div className="w-full">
      <Head>
        <title>cobogo - submit</title>
      </Head>

      <PageWrapper>
        <MobileTopBar haveSteps={false} />

        <Steps />

        <StartSubmission />

        <Footer />
      </PageWrapper>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session?.user) {
    if (session.youtubeChannels) {
      if (session.profiles[0]) {
        return {
          redirect: {
            destination: '/submit/video',
            permanent: false,
          },
        };
      }
    }
  }

  return {
    props: {},
  };
};
