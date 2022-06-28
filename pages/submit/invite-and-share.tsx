import ChannelBox from '@components/ChannelBox';
import Link from '@components/Link';
import PageContainer from '@components/PageContainer';
import ShareLinks from '@components/ShareLinks';
import StepContainer from '@components/StepContainer';
import Steps from '@components/Steps';
import StepSubContainer from '@components/StepSubContainer';
import Reward from '@components/submit/Reward';
import TopBar from '@components/TopBar';
import { LoadingContext } from '@contexts/LoadingContext';
import {
  fetchSessionData,
  readAccountsByReferralId,
} from '@services/cobogoApi';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useContext, useEffect } from 'react';

interface InviteProps {
  bannerImage: string;
  title: string;
  youtubeDescription: string;
  referralCode: string;
  verifiedVideo: boolean;
  tokens: number;
  onboardedFriends: number;
}

export default function Index({
  bannerImage,
  title,
  youtubeDescription,
  referralCode,
  verifiedVideo,
  tokens,
  onboardedFriends,
}: InviteProps) {
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return (
    <div className="w-full">
      <PageContainer>
        <Steps />

        <StepContainer>
          <TopBar
            noLogo
            onboardedFriends={onboardedFriends}
            tokens={tokens}
            referralCode={referralCode}
          />

          <StepSubContainer>
            <div className="flex flex-col">
              <p className="mb-6 text-[40px]">congrats!</p>
              <p className="text-xl mb-10 max-w-[441px]">
                you are now whitelisted for the Content Creator NFT and have
                guaranteed <span className="font-bold">100 CBG tokens</span>
              </p>

              <div className="flex flex-col gap-8 mb-12">
                <Reward
                  image="/images/4-rewards.png"
                  description={
                    <p>
                      join whitelist and earn{' '}
                      <strong className="text-pink3">100</strong> CBG tokens
                    </p>
                  }
                  done
                />

                {verifiedVideo && (
                  <Reward
                    image="/images/full-rewards.png"
                    description={
                      <p>
                        earn <strong className="text-pink3">1,000</strong> more
                        CBG tokens recording a video{' '}
                      </p>
                    }
                    link="/submit/video"
                    linkText="view rules"
                    done={verifiedVideo}
                  />
                )}

                <Reward
                  image="/images/1-reward.png"
                  description={
                    <p>
                      earn <strong className="text-pink3">10</strong> more CBG
                      tokens by sharing on Twitter{' '}
                    </p>
                  }
                  link={`https://twitter.com/intent/tweet?text=Check%20this%20out!%20%0A%0A@cobogosocial%20is%20a%20dapp%20that%20helps%20YouTubers%20monetize%20themselves%20sustainably%20through%20their%20communities%20using%20blockchain.%20%0A%0AUse%20my%20referral%20link%20when%20you%20sign%20up%20for%20free%20for%20the%20whitelist,%20and%20we%20both%20get%20rewards!%0Aapp.cobogo.social/submit?ref=${referralCode}`}
                  linkText="share on Twitter"
                />

                <Reward
                  image="/images/infinite-rewards.png"
                  description={
                    <p>
                      earn <strong className="text-pink3">50</strong> more CBG
                      tokens for each Creator whitelisted using your referral
                      link
                    </p>
                  }
                  link="/referral-dashboard"
                  linkText="view referral link"
                />

                {!verifiedVideo && (
                  <Reward
                    image="/images/full-rewards.png"
                    description={
                      <p>
                        earn <strong className="text-pink3">1,000</strong> more
                        CBG tokens recording a video
                      </p>
                    }
                    link="/submit/video"
                    linkText="view rules"
                    done={verifiedVideo}
                  />
                )}

                <Reward
                  image="/images/2-rewards.png"
                  description="earn 50 more CBG tokens completing
                your profile"
                  linkText="coming soon..."
                />
              </div>

              <div className="mb-10">
                <ShareLinks referralCode={referralCode} />
              </div>

              <Link href="/submit/success">
                <button
                  onClick={() => setLoading(true)}
                  className="font-bold text-gray3 hover:cursor-pointer mb-12"
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

    if (!profile.attributes.handle || !profile.attributes.waitlist) {
      return {
        redirect: {
          destination: '/submit/create-profile',
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

    return {
      props: {
        bannerImage: '',
        title: '',
        youtubeDescription: '',
        referralCode: '',
        onboardedFriends: 0,
        tokens: 0,
        verifiedVideo: false,
      },
    };
  }
};
