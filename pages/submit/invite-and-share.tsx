import ChannelBox from '@components/ChannelBox';
import Earn1000CBGNotification from '@components/Earn1000CBGNotification';
import Earn10CBGNotification from '@components/Earn10CBGNotification';
import Earn50CBGNotification from '@components/Earn50CBGNotification';
import Earn50CBGNotification2 from '@components/Earn50CBGNotification2';
import Footer from '@components/Footer';
import Link from '@components/Link';
import PageContainer from '@components/PageContainer';
import ShareLinks from '@components/ShareLinks';
import StepContainer from '@components/StepContainer';
import StepsMenu from '@components/StepsMenu';
import StepSubContainer from '@components/StepSubContainer';
import TopBar from '@components/TopBar';
import WaitlistNotification from '@components/WaitlistNotification';
import { LoadingContext } from '@contexts/LoadingContext';
import {
  fetchSessionData,
  readAccountsByReferralId,
} from '@services/cobogoApi';
import { GetServerSideProps } from 'next';
import { getSession, signIn, useSession } from 'next-auth/react';
import { useContext, useEffect } from 'react';

interface InviteProps {
  bannerImage: string;
  title: string;
  youtubeDescription: string;
  referralCode: string;
  onboardedFriends: number;
  tokens: number;
  verifiedVideo: boolean;
}

export default function Index({
  bannerImage,
  title,
  youtubeDescription,
  referralCode,
  onboardedFriends,
  tokens,
  verifiedVideo,
}: InviteProps) {
  const { data: session } = useSession();
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signIn('google');
    }
  }, [session]);

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return (
    <div className="w-full">
      <PageContainer>
        <StepsMenu />

        <StepContainer>
          <TopBar
            onboardedFriends={onboardedFriends}
            tokens={tokens}
            referralCode={referralCode}
            noLogo
          />

          <StepSubContainer>
            <div className="flex flex-col">
              <p className="mb-4 text-4xl">congrats!</p>

              <p className="sm:text-lg mb-8 sm:w-[408px]">
                you are now whitelisted for the Content Creator NFT and have
                guaranteed <span className="font-bold">100 CBG tokens</span>
              </p>

              <WaitlistNotification />

              {verifiedVideo && (
                <Earn1000CBGNotification verifiedVideo={verifiedVideo} />
              )}

              <Earn10CBGNotification referralCode={referralCode} />

              <Earn50CBGNotification />

              {!verifiedVideo && (
                <Earn1000CBGNotification verifiedVideo={verifiedVideo} />
              )}

              <Earn50CBGNotification2 />

              <div className="mb-8">
                <ShareLinks referralCode={referralCode} />
              </div>

              <Link href="/submit/success">
                <button
                  onClick={() => setLoading(true)}
                  className="font-bold text-gray3 hover:cursor-pointer"
                >
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
  try {
    const session = await getSession({ req });
    const { account, profile } = await fetchSessionData(session);

    if (!account || !profile) {
      return {
        redirect: {
          destination: '/submit/connect',
          permanent: false,
        },
      };
    }

    if (!profile.attributes.handle) {
      return {
        redirect: {
          destination: '/submit/create-profile',
          permanent: false,
        },
      };
    }

    if (
      !account.attributes.wallets.data.length ||
      !profile.attributes.waitlist
    ) {
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
        verifiedVideo: profile.attributes.video.data,
      },
    };
  } catch (error) {
    console.error(error.message);

    // TODO: Quando cai aqui está dando erro: TypeError: Cannot read properties of undefined (reading 'slice') porque as props vão todas vazias.
    return {
      props: {},
    };
  }
};
