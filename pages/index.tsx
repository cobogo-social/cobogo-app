import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';

import Footer from '../components/Footer';
import MobileTopBar from '../components/MobileTopBar';
import PageWrapper from '../components/PageWrapper';
import StartSubmission from '../components/StartSubmission';
import Steps from '../components/Steps';
import cobogoApi from '../services/cobogoApi';
import youtubeApi from '../services/youtubeApi';

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
    const channel = await youtubeApi.get(
      `/channels?part=snippet%2CbrandingSettings&mine=true`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    if (channel.data.items) {
      const createdProfile = await cobogoApi.get(
        `/api/profiles?filters[channel_id][$eq]=${channel.data.items[0].id}`,
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
  }

  return {
    props: {},
  };
};
