import CreateProfile from '@components/CreateProfile';
import Footer from '@components/Footer';
import MobileMenu from '@components/MobileMenu';
import PageContainer from '@components/PageContainer';
import StepsMenu from '@components/StepsMenu';
import { readAccountByYoutubeAccountId } from '@services/cobogoApi';
import { GetServerSideProps } from 'next';
import { getSession, signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';

interface CreateProfileProps {
  bannerImage: string;
  title: string;
  youtubeDescription: string;
}

export default function Index({
  bannerImage,
  title,
  youtubeDescription,
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
          bannerImage={bannerImage}
          title={title}
          youtubeDescription={youtubeDescription}
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
  const profile = account.attributes.profiles.data[0];

  if (profile.attributes.handle) {
    return {
      redirect: {
        destination: '/submit/video',
        permanent: false,
      },
    };
  }

  return {
    props: {
      bannerImage: profile.attributes.banner_image,
      title: profile.attributes.title,
      youtubeDescription: profile.attributes.youtube_description,
    },
  };
};
