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
        <MobileTopBar haveSteps setOpen={handleSetOpen} />

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

  if (!session.profiles[0]?.attributes.waitlist) {
    return {
      redirect: {
        destination: '/submit/video',
        permanent: false,
      },
    };
  }

  return {
    props: {
      banner:
        session.youtubeChannels[0].brandingSettings.image.bannerExternalUrl,
      title: session.youtubeChannels[0].snippet.title,
      description: session.youtubeChannels[0].snippet.description,
      referralCode: session.profiles[0].attributes.referral_code,
    },
  };
};
