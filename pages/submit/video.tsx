import Bullet from '@components/Bullet';
import Button from '@components/Button';
import ChannelBox from '@components/ChannelBox';
import Footer from '@components/Footer';
import PageContainer from '@components/PageContainer';
import StepContainer from '@components/StepContainer';
import Steps from '@components/Steps';
import StepSubContainer from '@components/StepSubContainer';
import SuccessBullet from '@components/SuccessBullet';
import TopBar from '@components/TopBar';
import WarningBullet from '@components/WarningBullet';
import { ErrorContext } from '@contexts/ErrorContext';
import { LoadingContext } from '@contexts/LoadingContext';
import { fetchSessionData } from '@services/cobogoApi';
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
}

export default function Index({
  bannerImage,
  title,
  youtubeDescription,
  handle,
}: VideoProps) {
  const { setLoading } = useContext(LoadingContext);
  const { setError } = useContext(ErrorContext);
  const [videoStatus, setVideoStatus] = useState(1);
  const { push } = useRouter();

  async function verifyVideo() {
    try {
      setLoading(true);
      setVideoStatus(1);

      const checkVideo = await axios.get(`/api/youtube/checkVideo`);

      if (checkVideo.data.error) {
        setLoading(false);
        setError(checkVideo.data.error);
      }

      if (checkVideo.data.data.validVideo) {
        setVideoStatus(3);
      } else {
        setVideoStatus(2);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
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
          <TopBar noLogo />

          <StepSubContainer>
            <div>
              <p className="mb-4 text-4xl">video</p>

              <p className="sm:text-xl sm:w-[408px] mb-8">
                want to earn one{' '}
                <span className="font-bold">thousand CBG Tokens</span>? Record
                and post a video of:
              </p>

              <div className="mb-4">
                {videoStatus === 1 && <Bullet text="longer than 2 minutes" />}

                {videoStatus === 2 && (
                  <WarningBullet text="longer than 2 minutes" />
                )}

                {videoStatus === 3 && (
                  <SuccessBullet text="longer than 2 minutes" />
                )}

                <p className="text-sm text-gray3 sm:w-[408px] pl-9">
                  {`we believe that in order to explain what cobogo is about, that is, a
          platform to monetize your work, and to let your community know how
          they'll be able to support you, a video of at least 2 minutes is
          necessary.`}
                </p>
              </div>

              <div className="mb-4">
                {videoStatus === 1 && (
                  <Bullet text='have the name "cobogo" in the title' />
                )}

                {videoStatus === 2 && (
                  <WarningBullet text='have the name "cobogo" in the title' />
                )}

                {videoStatus === 3 && (
                  <SuccessBullet text='have the name "cobogo" in the title' />
                )}

                <p className="text-sm text-gray3 sm:w-[408px] pl-9">
                  to make it easier to find and identify your video, we require
                  you to put the name 'cobogo' in the title.
                </p>
              </div>

              <div className="mb-8">
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

                <p className="text-sm text-gray3 sm:w-[408px] pl-9">
                  lastly, you will need to put the link to your staking page in
                  the video description box so that your community can find you
                  on cobogo, and support you!
                </p>
              </div>
              {videoStatus === 1 && (
                <Button
                  color="bg-blue"
                  text="verify video"
                  onClick={verifyVideo}
                />
              )}

              {videoStatus === 2 && (
                <Button
                  color="bg-blue"
                  text="verify again"
                  onClick={verifyVideo}
                />
              )}

              {videoStatus === 3 && (
                <Button
                  color="bg-blue"
                  text="back to invite and share"
                  onClick={backToInviteAndShare}
                />
              )}
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

    if (profile.attributes.video.data) {
      return {
        redirect: {
          destination: '/submit/invite-and-share',
          permanent: false,
        },
      };
    }

    return {
      props: {
        bannerImage: profile.attributes.banner_image,
        title: profile.attributes.title,
        youtubeDescription: profile.attributes.youtube_description,
        handle: profile.attributes.handle,
      },
    };
  } catch (error) {
    console.error(error.message);

    return {
      props: {},
    };
  }
};
