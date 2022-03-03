import { GetServerSideProps } from 'next';
import { getSession, signIn, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import Footer from '../../components/Footer';
import MobileSteps from '../../components/MobileSteps';
import MobileTopBar from '../../components/MobileTopBar';
import PageWrapper from '../../components/PageWrapper';
import Steps from '../../components/Steps';
import Success from '../../components/Success';
import cobogoApi from '../../services/cobogoApi';
import youtubeApi from '../../services/youtubeApi';

interface SuccessProps {
  banner: string;
  title: string;
  description: string;
  referralCode: string;
}

export default function Index({
  banner,
  title,
  description,
  referralCode,
}: SuccessProps) {
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
        <MobileTopBar setOpen={handleSetOpen} />

        <Steps />

        <MobileSteps open={open} />

        <Success
          banner={banner}
          title={title}
          description={description}
          referralCode={referralCode}
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
      referralCode: createdProfile.data.data[0].attributes.referral_code,
    },
  };
};
