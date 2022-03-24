import { GetServerSideProps } from 'next';
import { getSession, signIn, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { readAccountByEmail, readProfileByChannel, readChannelByAccount } from '../../services/cobogoApi';
import { readChannel as readChannelFromYoutube } from '../../services/youtubeApi';

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
}

export default function Index({
  banner,
  title,
  description,
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
        />

        <Footer />
      </PageWrapper>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.user) {
    return {
      redirect: {
        destination: '/submit/connect',
        permanent: false,
      },
    };
  }

  const account = await readAccountByEmail(session.user.email);
  const channel = await readChannelByAccount(account);
  if (!channel) {
    return {
      redirect: {
        destination: '/submit/connect',
        permanent: false,
      },
    };
  }

  const profile = await readProfileByChannel(channel);
  if (profile) {
    return {
      redirect: {
        destination: '/submit/video',
        permanent: false,
      },
    };
  }

  const youtubeChannel = await readChannelFromYoutube(session);
  return {
    props: {
      banner: (youtubeChannel && youtubeChannel.brandingSettings.image)
        ? youtubeChannel.brandingSettings.image.bannerExternalUrl
        : '',
      title: youtubeChannel
        ? youtubeChannel.snippet.title
        : '',
      description: youtubeChannel
        ? youtubeChannel.snippet.description
        : ''
    },
  };
};
