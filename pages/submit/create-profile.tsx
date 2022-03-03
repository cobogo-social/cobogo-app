import { GetServerSideProps } from 'next';
import { getSession, signIn, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import CreateProfile from '../../components/CreateProfile';
import Footer from '../../components/Footer';
import MobileSteps from '../../components/MobileSteps';
import MobileTopBar from '../../components/MobileTopBar';
import Steps from '../../components/Steps';
import cobogoApi from '../../services/cobogoApi';
import youtubeApi from '../../services/youtubeApi';

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

      <div className="grid grid-rows-1 sm:grid-rows-[870px_70px] grid-cols-1 sm:grid-cols-[332px_1fr]">
        <MobileTopBar setOpen={handleSetOpen} />

        <Steps />

        <MobileSteps open={open} />

        <CreateProfile
          banner={banner}
          title={title}
          description={description}
          channelId={channelId}
        />

        <Footer />
      </div>
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

  const response = await youtubeApi.get(
    `/channels?part=snippet%2CbrandingSettings&mine=true`,
    {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    }
  );

  return {
    props: {
      banner: response.data.items
        ? response.data.items[0].brandingSettings.image.bannerExternalUrl
        : '',
      title: response.data.items ? response.data.items[0].snippet.title : '',
      description: response.data.items
        ? response.data.items[0].snippet.description
        : '',
      channelId: response.data.items ? response.data.items[0].id : '',
    },
  };
};
