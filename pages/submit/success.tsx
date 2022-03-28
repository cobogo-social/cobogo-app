import Footer from '@components/Footer';
import MobileTopBar from '@components/MobileTopBar';
import PageWrapper from '@components/PageWrapper';
import Steps from '@components/Steps';
import Success from '@components/Success';
import {
  readAccountByEmail,
  readChannelByAccount,
  readProfileByChannel,
  readProfilesByReferral,
} from '@services/cobogoApi';
import { readChannel as readChannelFromYoutube } from '@services/youtubeApi';
import { GetServerSideProps } from 'next';
import { getSession, signIn, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect } from 'react';

interface SuccessProps {
  banner: string;
  title: string;
  description: string;
  referralCode: string;
  onboardedFriends: number;
}

export default function Index({
  banner,
  title,
  description,
  referralCode,
  onboardedFriends,
}: SuccessProps) {
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

      <PageWrapper>
        <Steps />

        <MobileTopBar />

        <Success
          banner={banner}
          title={title}
          description={description}
          referralCode={referralCode}
          onboardedFriends={onboardedFriends}
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

  if (!profile) {
    return {
      redirect: {
        destination: '/submit/create-profile',
        permanent: false,
      },
    };
  }

  if (!profile.attributes.waitlist) {
    return {
      redirect: {
        destination: '/submit/video',
        permanent: false,
      },
    };
  }

  const youtubeChannel = await readChannelFromYoutube(session);

  const onboardedFriends = await readProfilesByReferral(profile.id);

  return {
    props: {
      banner:
        youtubeChannel && youtubeChannel.brandingSettings.image
          ? youtubeChannel.brandingSettings.image.bannerExternalUrl
          : '',
      title: youtubeChannel ? youtubeChannel.snippet.title : '',
      description: youtubeChannel ? youtubeChannel.snippet.description : '',
      referralCode: profile.attributes.referral_code,
      onboardedFriends: onboardedFriends.length,
    },
  };
};
