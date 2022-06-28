import Bullet from '@components/Bullet';
import Button from '@components/Button';
import ChannelBox from '@components/ChannelBox';
import PageContainer from '@components/PageContainer';
import StepContainer from '@components/StepContainer';
import Steps from '@components/Steps';
import StepSubContainer from '@components/StepSubContainer';
import SuccessBullet from '@components/SuccessBullet';
import TopBar from '@components/TopBar';
import WarningBullet from '@components/WarningBullet';
import { LoadingContext } from '@contexts/LoadingContext';
import { MessageContext } from '@contexts/MessageContext';
import {
  fetchSessionData,
  readAccountsByReferralId,
} from '@services/cobogoApi';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

interface VideoProps {
  bannerImage: string;
  title: string;
  youtubeDescription: string;
  handle: string;
  onboardedFriends?: number;
  tokens?: number;
  referralCode?: string;
}

export default function Index({
  bannerImage,
  title,
  youtubeDescription,
  handle,
  onboardedFriends,
  tokens,
  referralCode,
}: VideoProps) {
  const { setLoading } = useContext(LoadingContext);
  const { setMessage } = useContext(MessageContext);
  const [videoStatus, setVideoStatus] = useState(1);
  const { push } = useRouter();

  async function verifyVideo() {
    try {
      setLoading(true);
      setVideoStatus(1);

      const checkVideo = await axios.get(`/api/youtube/checkVideo`);

      if (checkVideo.data.error) {
        setLoading(false);
        setMessage({
          text: checkVideo.data.error,
          type: 'error',
        });
      }

      if (checkVideo.data.data.validVideo) {
        setVideoStatus(3);
      } else {
        setVideoStatus(2);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setMessage({
        text: error.message,
        type: 'error',
      });
    }
  }

  function backToInviteAndShare() {
    setLoading(true);
    push('/submit/invite-and-share');
  }

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
            <div>
              <p className="mb-6 text-[40px]">video</p>

              <p className="text-xl sm:w-[408px] mb-10">
                want to earn one{' '}
                <span className="font-bold">thousand CBG Tokens</span>? Record
                and post a video of:
              </p>

              <div className="mb-10">
                {videoStatus === 1 && <Bullet text="longer than 2 minutes" />}

                {videoStatus === 2 && (
                  <WarningBullet text="longer than 2 minutes" />
                )}

                {videoStatus === 3 && (
                  <SuccessBullet text="longer than 2 minutes" />
                )}

                <p className="text-gray3 sm:w-[408px] pl-9">
                  {`we believe that in order to explain what cobogo is about, that is, a
          platform to monetize your work, and to let your community know how
          they'll be able to support you, a video of at least 2 minutes is
          necessary.`}
                </p>
              </div>

              <div className="mb-10">
                {videoStatus === 1 && (
                  <Bullet text='have the name "cobogo" in the title' />
                )}

                {videoStatus === 2 && (
                  <WarningBullet text='have the name "cobogo" in the title' />
                )}

                {videoStatus === 3 && (
                  <SuccessBullet text='have the name "cobogo" in the title' />
                )}

                <p className="text-gray3 sm:w-[408px] pl-9">
                  to make it easier to find and identify your video, we require
                  you to put the name 'cobogo' in the title.
                </p>
              </div>

              <div className="mb-10">
                {videoStatus === 1 && (
                  <Bullet text="link to" link={`app.cobogo.social/${handle}`} />
                )}

                {videoStatus === 2 && (
                  <WarningBullet
                    text="link to"
                    link={`app.cobogo.social/${handle}`}
                  />
                )}

                {videoStatus === 3 && (
                  <SuccessBullet
                    text="link to"
                    link={`app.cobogo.social/${handle}`}
                  />
                )}

                <p className="text-gray3 sm:w-[408px] pl-9">
                  lastly, you will need to put the link to your staking page in
                  the video description box so that your community can find you
                  on cobogo, and support you!
                </p>
              </div>

              {videoStatus === 1 && (
                <div className="mb-12">
                  <Button
                    color="bg-blue"
                    text="verify video"
                    onClick={verifyVideo}
                  />
                </div>
              )}

              {videoStatus === 2 && (
                <div className="mb-12">
                  <Button
                    color="bg-blue"
                    text="verify again"
                    onClick={verifyVideo}
                  />
                </div>
              )}

              {videoStatus === 3 && (
                <div className="mb-12">
                  <Button
                    color="bg-blue"
                    text="back to invite and share"
                    onClick={backToInviteAndShare}
                  />
                </div>
              )}
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

    if (!profile.attributes.handle) {
      return {
        redirect: {
          destination: '/submit/create-profile',
          permanent: false,
        },
      };
    }

    if (profile.attributes.video.data) {
      return {
        redirect: {
          destination: '/submit/invite-and-share',
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
        handle: profile.attributes.handle,
        referralCode: account.attributes.referral_code,
        onboardedFriends,
        tokens: account.attributes.tokens,
      },
    };
  } catch (error) {
    console.error(error.message);

    return {
      props: {
        bannerImage: '',
        title: '',
        youtubeDescription: '',
        handle: '',
        referralCode: '',
        onboardedFriends: 0,
        tokens: 0,
      },
    };
  }
};
