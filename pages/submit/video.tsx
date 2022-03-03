import { GetServerSideProps } from 'next';
import { getSession, signIn, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import Footer from '../../components/Footer';
import MobileSteps from '../../components/MobileSteps';
import MobileTopBar from '../../components/MobileTopBar';
import Steps from '../../components/Steps';
import Video from '../../components/Video';
import cobogoApi from '../../services/cobogoApi';
import youtubeApi from '../../services/youtubeApi';

interface VideoProps {
  banner: string;
  title: string;
  description: string;
  channelHandle: string;
  channelId: string;
}

export default function Index({
  banner,
  title,
  description,
  channelHandle,
  channelId,
}: VideoProps) {
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

        <Video
          banner={banner}
          title={title}
          description={description}
          channelHandle={channelHandle}
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

  if (createdProfile.data.data.length === 0) {
    return {
      redirect: {
        destination: '/submit/create-profile',
        permanent: false,
      },
    };
  }

  const verifyWaitlist = await cobogoApi.get(
    `/api/profiles?filters[account_email][$eq]=${session.user.email}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.COBOGO_API_TOKEN}`,
      },
    }
  );

  if (verifyWaitlist.data.data[0]?.attributes.waitlist) {
    return {
      redirect: {
        destination: '/submit/invite',
        permanent: false,
      },
    };
  }

  const response = await youtubeApi.get(
    `/channels?part=snippet%2CbrandingSettings&mine=true`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  );

  return {
    props: {
      banner: response.data.items[0].brandingSettings.image.bannerExternalUrl,
      title: response.data.items[0].snippet.title,
      description: response.data.items[0].snippet.description,
      channelHandle: createdProfile.data.data[0].attributes.handle,
      channelId: response.data.items[0].id,
    },
  };
};
