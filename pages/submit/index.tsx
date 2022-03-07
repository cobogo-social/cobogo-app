import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';

import Footer from '../../components/Footer';
import MobileTopBar from '../../components/MobileTopBar';
import PageWrapper from '../../components/PageWrapper';
import StartSubmission from '../../components/StartSubmission';
import Steps from '../../components/Steps';
import cobogoApi from '../../services/cobogoApi';

export default function Index() {
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
    const createdProfile = await cobogoApi.get(
      `/api/profiles?filters[account_email][$eq]=${session?.user.email}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.COBOGO_API_TOKEN}`,
        },
      }
    );

    if (createdProfile.data.data.length != 0) {
      return {
        redirect: {
          destination: '/submit/video',
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
};
