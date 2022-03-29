import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Bullet from './Bullet';
import Button from './Button';
import Loading from './Loading';
import SuccessBullet from './SuccessBullet';
import WarningBullet from './WarningBullet';

interface VerifyVideoProps {
  channelHandle: string;
}

export default function VerifyVideo({ channelHandle }: VerifyVideoProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [videoStatus, setVideoStatus] = useState(1);
  const { push } = useRouter();

  async function handleVerifyVideo() {
    setIsLoading(true);
    setVideoStatus(1);

    const result = await axios.get(`/api/youtube/checkVideo`);

    if (result.data.validVideo) {
      setVideoStatus(3);
    } else {
      setVideoStatus(2);
    }

    setIsLoading(false);
  }

  function handlePushToNextStep() {
    push('/submit/invite');
  }

  return (
    <>
      <Loading isLoading={isLoading} />

      <div className="flex flex-col">
        <p className="text-4xl text-white mb-4">video</p>

        <p className="sm:text-xl text-white sm:w-[408px] mb-8">
          {`to join the waitlist and earn CBG, you'll have to make a video
          presenting cobogo to your community, so they'll be ready to support
          you when the time comes!`}
        </p>

        <div className="mb-4">
          {videoStatus === 1 && <Bullet text="longer than 2 minutes" />}

          {videoStatus === 2 && <WarningBullet text="longer than 2 minutes" />}

          {videoStatus === 3 && <SuccessBullet text="longer than 2 minutes" />}

          <p className="text-sm text-graylight sm:w-[408px] pl-9">
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

          <p className="text-sm text-graylight sm:w-[408px] pl-9">
            {`to make it easier to find and identify your video, we require you to put the name "cobogo" in the title.`}
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

          <p className="text-sm text-graylight sm:w-[408px] pl-9">
            {`lastly, you will need to put the link to your staking page in the video description box so that your community can find you on cobogo, and support you!`}
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
    </>
  );
}
