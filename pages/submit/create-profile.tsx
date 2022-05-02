import CreateProfile from '@components/CreateProfile';
import Footer from '@components/Footer';
import MobileMenu from '@components/MobileMenu';
import PageContainer from '@components/PageContainer';
import StepsMenu from '@components/StepsMenu';
import {
  readAccountByYoutubeAccountId,
  readProfileByAccount,
} from '@services/cobogoApi';
import { readChannel as readChannelFromYoutube } from '@services/youtubeApi';
import { GetServerSideProps } from 'next';
import { getSession, signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';

interface CreateProfileProps {
  title: string;
  youtubeDescription: string;
  youtubeChannelId: string;
  bannerImage: string;
  profileImage: string;
  youtubeSubscribers: string;
}

export default function Index({
  title,
  youtubeDescription,
  youtubeChannelId,
  bannerImage,
  profileImage,
  youtubeSubscribers,
}: CreateProfileProps) {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signIn('google');
    }
  }, [session]);

  return (
    <div className="w-full">
      <PageContainer>
        <StepsMenu />

        <MobileMenu />

        <CreateProfile
          title={title}
          youtubeDescription={youtubeDescription}
          youtubeChannelId={youtubeChannelId}
          bannerImage={bannerImage}
          profileImage={profileImage}
          youtubeSubscribers={youtubeSubscribers}
        />

        <Footer />
      </PageContainer>
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

  const account = await readAccountByYoutubeAccountId(session.user['id']);

  const profile = await readProfileByAccount(account);

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
      title: youtubeChannel ? youtubeChannel.snippet.title : '',
      youtubeDescription: youtubeChannel
        ? youtubeChannel.snippet.description
        : '',
      youtubeChannelId: youtubeChannel ? youtubeChannel.id : '',
      bannerImage:
        youtubeChannel && youtubeChannel.brandingSettings.image
          ? youtubeChannel.brandingSettings.image.bannerExternalUrl
          : '',
      profileImage: youtubeChannel
        ? youtubeChannel.snippet.thumbnails.high.url
        : '',
      youtubeSubscribers: youtubeChannel
        ? youtubeChannel.statistics.subscriberCount
        : '',
    },
  };
};
