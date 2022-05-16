import ChannelBox from '@components/ChannelBox';
import Earn1000CBGNotification from '@components/Earn1000CBGNotification';
import Earn50CBGNotification from '@components/Earn50CBGNotification';
import Footer from '@components/Footer';
import Link from '@components/Link';
import MobileSubmitMenu from '@components/MobileSubmitMenu';
import PageContainer from '@components/PageContainer';
import ShareLinks from '@components/ShareLinks';
import StepContainer from '@components/StepContainer';
import StepsMenu from '@components/StepsMenu';
import StepSubContainer from '@components/StepSubContainer';
import SubmitStatsTopBar from '@components/SubmitStatsTopBar';
import WaitlistNotification from '@components/WaitlistNotification';
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

        <MobileSubmitMenu />

        <StepContainer>
          <SubmitStatsTopBar
            onboardedFriends={onboardedFriends}
            tokens={tokens}
          />

          <StepSubContainer>
            <div className="flex flex-col">
              <p className="mb-4 text-4xl">congrats!</p>

              <p className="sm:text-lg mb-8 sm:w-[408px]">
                you are now whitelisted for the Content Creator NFT and have
                guaranteed <span className="font-bold">100 CBG tokens</span>
              </p>

              <WaitlistNotification />

              <Earn1000CBGNotification />

              <Earn50CBGNotification referralCode={referralCode} />

              <div className="mb-8">
                <ShareLinks referralCode={referralCode} />
              </div>

              <Link href="/submit/success">
                <button className="font-bold text-gray3 hover:cursor-pointer">
                  skip
                </button>
              </Link>
            </div>

            <ChannelBox
              banner={bannerImage}
              title={title}
              description={youtubeDescription}
            />
          </StepSubContainer>
        </StepContainer>

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

  if (!profile.attributes.handle) {
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
        destination: '/submit/connect-wallet',
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
      referralCode: account.attributes.referral_code,
      onboardedFriends,
      tokens: account.attributes.tokens,
    },
  };
};
