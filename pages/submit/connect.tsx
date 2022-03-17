import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import ChannelNotFound from '../../components/ChannelNotFound';
import Connect from '../../components/Connect';
import Footer from '../../components/Footer';
import MobileSteps from '../../components/MobileSteps';
import MobileTopBar from '../../components/MobileTopBar';
import PageWrapper from '../../components/PageWrapper';
import Steps from '../../components/Steps';
import cobogoApi from '../../services/cobogoApi';

export default function Index() {
  const [open, setOpen] = useState(false);
  const [haveChannel, setHaveChannel] = useState<boolean>();
  const { data: session } = useSession();

  function handleSetOpen() {
    setOpen(!open);
  }

  function handleSetHaveChannel() {
    setHaveChannel(true);
  }

  useEffect(() => {
    if (session?.user) {
      if (!session.youtubeChannels) {
        setHaveChannel(false);
      } else {
        setHaveChannel(true);
      }
    } else {
      setHaveChannel(true);
    }
  }, [session]);

  return (
    <div className="w-full">
      <Head>
        <title>cobogo - submit</title>
      </Head>

      <PageWrapper>
        <MobileTopBar haveSteps setOpen={handleSetOpen} />

        <Steps />

        <MobileSteps open={open} />

        {!haveChannel ? (
          <ChannelNotFound setHaveChannel={handleSetHaveChannel} />
        ) : (
          <Connect />
        )}

        <Footer />
      </PageWrapper>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
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

    if (session.youtubeChannels) {
      return {
        redirect: {
          destination: '/submit/create-profile',
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
};
