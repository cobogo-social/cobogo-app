import Bullet from '@components/bullets/Bullet';
import SuccessBullet from '@components/bullets/SuccessBullet';
import WarningBullet from '@components/bullets/WarningBullet';
import Button from '@components/buttons/Button';
import ChannelBox from '@components/channelboxes/ChannelBox';
import StepContainer from '@components/containers/StepContainer';
import StepSubContainer from '@components/containers/StepSubContainer';
import ErrorModal from '@components/modals/ErrorModal';
import Loading from '@components/others/Loading';
import TopBar from '@components/topbars/TopBar';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface VideoProps {
  banner: string;
  title: string;
  description: string;
  channelHandle: string;
}

export default function Video({
  banner,
  title,
  description,
  channelHandle,
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
    push('/submit/invite');
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
              {`to join the waitlist and earn CBG, you'll have to make a video
          presenting cobogo to your community, so they'll be ready to support
          you when the time comes!`}
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
                <Bullet
                  text="link to"
                  link={`app.cobogo.social/${channelHandle}`}
                />
              )}

              {videoStatus === 2 && (
                <WarningBullet
                  text="link to"
                  link={`app.cobogo.social/${channelHandle}`}
                />
              )}

              {videoStatus === 3 && (
                <SuccessBullet
                  text="link to"
                  link={`app.cobogo.social/${channelHandle}`}
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
                width="w-40"
                height="h-9"
                color="bg-blue"
                hoverColor="brightness-90"
                text="verify video"
                onClick={handleVerifyVideo}
              />
            )}

            {videoStatus === 2 && (
              <Button
                width="w-40"
                height="h-9"
                color="bg-blue"
                hoverColor="brightness-90"
                text="verify again"
                onClick={handleVerifyVideo}
              />
            )}

            {videoStatus === 3 && (
              <Button
                width="w-40"
                height="h-9"
                color="bg-blue"
                hoverColor="brightness-90"
                text="next step"
                onClick={handlePushToNextStep}
              />
            )}
          </div>

          <ChannelBox banner={banner} title={title} description={description} />
        </StepSubContainer>
      </StepContainer>
    </>
  );
}
