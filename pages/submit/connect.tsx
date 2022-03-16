import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { useState } from 'react';

import Connect from '../../components/Connect';
import Footer from '../../components/Footer';
import MobileSteps from '../../components/MobileSteps';
import MobileTopBar from '../../components/MobileTopBar';
import PageWrapper from '../../components/PageWrapper';
import Steps from '../../components/Steps';
import cobogoApi from '../../services/cobogoApi';

export default function Index() {
  const [open, setOpen] = useState(false);

  function handleSetOpen() {
    setOpen(!open);
  }

  return (
    <div className="w-full">
      <Head>
        <title>cobogo - submit</title>
      </Head>

      <PageWrapper>
        <MobileTopBar haveSteps setOpen={handleSetOpen} />

        <Steps />

        <MobileSteps open={open} />

        <Connect />

        <Footer />
      </PageWrapper>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });

  if (session?.user) {
    if (!session.accounts[0]) {
      await cobogoApi.post(
        '/api/accounts',
        {
          data: {
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.COBOGO_API_TOKEN}`,
          },
        }
      );
    }

    if (session.youtubeChannels) {
      if (!session.accounts[0]) {
        const createdAccount = await cobogoApi.get(
          `/api/accounts?filters[email][$eq]=${session.user.email}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.COBOGO_API_TOKEN}`,
            },
          }
        );

        await cobogoApi.post(
          '/api/channels',
          {
            data: {
              title: session.youtubeChannels[0].snippet.title,
              description: session.youtubeChannels[0].snippet.description,
              channel_id: session.youtubeChannels[0].id,
              account: createdAccount.data.data[0].id,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.COBOGO_API_TOKEN}`,
            },
          }
        );
      }
    }

    if (!session.youtubeChannels[0]) {
      return {
        redirect: {
          destination: '/submit/channel-not-found',
          permanent: false,
        },
      };
    } else {
      return {
        redirect: {
          destination: `/submit/create-profile${
            query.ref ? '?ref=' + query.ref : ''
          }`,
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
};
