import Bullet from '@components/Bullet';
import Button from '@components/Button';
import ChannelBox from '@components/ChannelBox';
import ErrorModal from '@components/ErrorModal';
import Loading from '@components/Loading';
import StepContainer from '@components/StepContainer';
import StepSubContainer from '@components/StepSubContainer';
import SuccessBullet from '@components/SuccessBullet';
import TopBar from '@components/TopBar';
import WarningBullet from '@components/WarningBullet';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface VideoProps {
  bannerImage: string;
  title: string;
  youtubeDescription: string;
  handle: string;
}

export default function Video({
  bannerImage,
  title,
  youtubeDescription,
  handle,
}: VideoProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [videoStatus, setVideoStatus] = useState(1);
  const { push } = useRouter();

  async function handleVerifyVideo() {
    setIsLoading(true);
    setVideoStatus(1);

    const checkVideo = await axios.get(`/api/youtube/checkVideo`);

    if (checkVideo.data.error) {
      setIsError(true);
    }

    if (checkVideo.data.data.validVideo) {
      setVideoStatus(3);
    } else {
      setVideoStatus(2);
    }

    setIsLoading(false);
  }

  function handlePushToNextStep() {
    setIsLoading(true);
    push('/submit/invite-and-share');
  }

  return (
    <>
      <Loading isLoading={isLoading} />
      <ErrorModal isOpen={isError} setIsOpen={setIsError} />

      <StepContainer>
        <TopBar />

        <StepSubContainer>
          <div className="flex flex-col">
            <p className="mb-4 text-4xl">video</p>

            <p className="sm:text-xl sm:w-[408px] mb-8">
              want to earn one{' '}
              <span className="font-bold">thousand CBG Tokens</span>? Record and
              post a video of:
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
                the video description box so that your community can find you on
                cobogo, and support you!
              </p>
            </div>
            {videoStatus === 1 && (
              <Button
                width="w-[131px]"
                height="h-[38px]"
                color="bg-blue"
                text="verify video"
                onClick={handleVerifyVideo}
              />
            )}

            {videoStatus === 2 && (
              <Button
                width="w-[131px]"
                height="h-[38px]"
                color="bg-blue"
                text="verify again"
                onClick={handleVerifyVideo}
              />
            )}

            {videoStatus === 3 && (
              <Button
                width="w-[131px]"
                height="h-[38px]"
                color="bg-blue"
                text="next step"
                onClick={handlePushToNextStep}
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
    </>
  );
}
