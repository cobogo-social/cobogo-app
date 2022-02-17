import { GetServerSideProps } from 'next';
import { getSession, signIn, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect } from 'react';

import Footer from '../../components/Footer';
import Review from '../../components/Review';
import Steps from '../../components/Steps';
import cobogoApi from '../../services/cobogoApi';
import youtubeApi from '../../services/youtubeApi';

interface ReviewProps {
  banner: string;
  title: string;
  description: string;
  channelHandle: string;
}

export default function Index({
  banner,
  title,
  description,
  channelHandle,
}: ReviewProps) {
  const { data: session } = useSession();

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

      <div className="grid grid-rows-[945px_70px] grid-cols-[332px_1fr]">
        <Steps />

        <Review
          banner={banner}
          title={title}
          description={description}
          channelHandle={channelHandle}
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

  const verifyWaitlist = await cobogoApi.get(
    `/api/profiles?filters[account_email][$eq]=${session.user.email}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.COBOGO_API_TOKEN}`,
      },
    }
  );

  if (!verifyWaitlist.data.data[0]?.attributes.waitlist) {
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
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  );

  const createdProfile = await cobogoApi.get(
    `/api/profiles?filters[account_email][$eq]=${session?.user.email}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.COBOGO_API_TOKEN}`,
      },
    }
  );

  return {
    props: {
      banner: response.data.items[0].brandingSettings.image.bannerExternalUrl,
      title: response.data.items[0].snippet.title,
      description: response.data.items[0].snippet.description,
      channelHandle: createdProfile.data.data[0].attributes.handle,
    },
  };
};
