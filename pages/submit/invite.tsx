import Footer from '@components/Footer';
import Invite from '@components/Invite';
import MobileMenu from '@components/MobileMenu';
import PageContainer from '@components/PageContainer';
import StepsMenu from '@components/StepsMenu';
import {
  readAccountByYoutubeAccountId,
  readAccountsByReferralId,
} from '@services/cobogoApi';
import { GetServerSideProps } from 'next';
import { getSession, signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';

interface InviteProps {
  bannerImage: string;
  title: string;
  youtubeDescription: string;
  referralCode: string;
  onboardedFriends: number;
  tokens: number;
}

export default function Index({
  bannerImage,
  title,
  youtubeDescription,
  referralCode,
  onboardedFriends,
  tokens,
}: InviteProps) {
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

        <Invite
          bannerImage={bannerImage}
          title={title}
          youtubeDescription={youtubeDescription}
          referralCode={referralCode}
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
    console.log(accountByReferralId.attributes.profiles);
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
      referralCode: account.attributes.referral_code,
      onboardedFriends,
      tokens: account.attributes.tokens,
    },
  };
};
