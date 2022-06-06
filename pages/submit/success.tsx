import ChannelBox from '@components/ChannelBox';
import Footer from '@components/Footer';
import JoinChannel from '@components/JoinChannel';
import Link from '@components/Link';
import PageContainer from '@components/PageContainer';
import StepContainer from '@components/StepContainer';
import StepsMenu from '@components/StepsMenu';
import StepSubContainer from '@components/StepSubContainer';
import TopBar from '@components/TopBar';
import WhitelistedNotification from '@components/WhitelistedNotification';
import { LoadingContext } from '@contexts/LoadingContext';
import {
  fetchSessionData,
  readAccountsByReferralId,
} from '@services/cobogoApi';
import { GetServerSideProps } from 'next';
import { getSession, signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useContext, useEffect } from 'react';

interface SuccessProps {
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
  onboardedFriends,
  tokens,
  referralCode,
}: SuccessProps) {
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
            <div className="flex flex-col mb-8">
              <p className="flex mb-4 text-4xl">
                whitelisted{' '}
                <span className="flex ml-4">
                  <Image
                    src="/images/success-icon.svg"
                    width={34}
                    height={34}
                    alt="success icon"
                  />
                </span>
              </p>

              <p className="sm:text-xl sm:w-[408px] mb-8">
                now you are eligible to join an exclusive{' '}
                <span className="font-bold">channel</span> for Content Creators!
                Be a pioneer in the first Content Creator{' '}
                <span className="font-bold">DAO</span>!
              </p>

              <p className="text-xs sm:text-sm mb-8 sm:w-[408px]">
                <span className="font-bold">cobogo</span> is a dApp still in
                development, but the channel{' '}
                <span className="font-bold">{title}</span> has been added to the
                waitlist.
              </p>

              <WhitelistedNotification />

              <JoinChannel />

              <Link href="/submit/invite-and-share">
                <button
                  onClick={() => setLoading(true)}
                  className="font-bold text-gray3 hover:cursor-pointer"
                >
                  back to invite and share
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
      },
    };
  } catch (error) {
    console.error(error.message);

    return {
      props: {},
    };
  }
};
