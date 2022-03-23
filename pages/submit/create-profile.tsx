import { GetServerSideProps } from 'next';
import { getSession, signIn, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import CreateProfile from '../../components/CreateProfile';
import Footer from '../../components/Footer';
import MobileSteps from '../../components/MobileSteps';
import MobileTopBar from '../../components/MobileTopBar';
import PageWrapper from '../../components/PageWrapper';
import Steps from '../../components/Steps';

interface CreateProfileProps {
  banner: string;
  title: string;
  description: string;
  channelId: string;
}

export default function Index({
  banner,
  title,
  description,
  channelId,
}: CreateProfileProps) {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  function handleSetOpen() {
    setOpen(!open);
  }

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signIn('google');
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

        <CreateProfile
          banner={banner}
          title={title}
          description={description}
          channelId={channelId}
        />

        <Footer />
      </PageWrapper>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  const readProfileByChannelId = async () => {
    const response = await cobogoApi.get(
      `/api/profiles?filters[channel_id][$eq]=${readChannel.data.items[0].id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.COBOGO_API_TOKEN}`,
        },
      }
    );
    return response.data.data;
  }

  if (!session?.user) {
    return {
      redirect: {
        destination: '/submit/connect',
        permanent: false,
      },
    };
  }

  if (!session.youtubeChannels) {
    return {
      redirect: {
        destination: '/submit/connect',
        permanent: false,
      },
    };
  }

  if (session.profiles[0]) {
    return {
      redirect: {
        destination: '/submit/video',
        permanent: false,
      },
    };
  }

  return {
    props: {
      banner: session.youtubeChannels
        ? session.youtubeChannels[0].brandingSettings.image.bannerExternalUrl
        : '',
      title: session.youtubeChannels
        ? session.youtubeChannels[0].snippet.title
        : '',
      description: session.youtubeChannels
        ? session.youtubeChannels[0].snippet.description
        : '',
      channelId: session.youtubeChannels ? session.youtubeChannels[0].id : '',
    },
  };
};
