import Footer from '@components/Footer';
import MobileMenu from '@components/MobileMenu';
import PageContainer from '@components/PageContainer';
import StepsMenu from '@components/StepsMenu';
import Success from '@components/Success';
import {
  readAccountByYoutubeAccountId,
  readAccountsByReferralId,
} from '@services/cobogoApi';
import { GetServerSideProps } from 'next';
import { getSession, signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';

interface SuccessProps {
  bannerImage: string;
  title: string;
  youtubeDescription: string;
  onboardedFriends: number;
  tokens: number;
}

export default function Index({
  bannerImage,
  title,
  youtubeDescription,
  onboardedFriends,
  tokens,
}: SuccessProps) {
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

        <Success
          bannerImage={bannerImage}
          title={title}
          youtubeDescription={youtubeDescription}
          onboardedFriends={onboardedFriends}
          tokens={tokens}
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

  let onboardedFriends = 0;

  const accountsByReferralId = await readAccountsByReferralId(account.id);

  accountsByReferralId.forEach((accountByReferralId) => {
    const waitlisted =
      accountByReferralId.attributes.profiles.data[0].attributes.waitlist;

    if (waitlisted) {
      onboardedFriends += 1;
    }
  });

  return {
    props: {
      bannerImage: profile.attributes.banner_image,
      title: profile.attributes.title,
      youtubeDescription: profile.attributes.youtube_description,
      onboardedFriends,
      tokens: account.attributes.tokens,
    },
  };
};
