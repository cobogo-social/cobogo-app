import axios from 'axios';
import moment from 'moment';
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
  const [twoMinutesOk, setTwoMinutesOk] = useState(1);
  const [cobogoTitleOk, setCobogoTitleOk] = useState(1);
  const [descriptionLinkOk, setDescriptionLinkOk] = useState(1);
  const { push } = useRouter();

  async function handleVerifyVideo() {
    setIsLoading(true);

    const readVideos = await axios.get(`/api/youtube/readVideos`);

    if (readVideos.data.items.length) {
      readVideos.data.items.forEach((item) => {
        axios
          .get('/api/youtube/readVideoById', {
            params: {
              id: item.id.videoId,
            },
          })
          .then(async (response) => {
            setCobogoTitleOk(3);

            if (
              moment
                .duration(response.data.items[0].contentDetails.duration)
                .asMinutes()
            ) {
              setTwoMinutesOk(3);
            } else {
              setTwoMinutesOk(2);
            }

            if (
              response.data.items[0].snippet.description
                .toLowerCase()
                .includes('caminho')
            ) {
              setDescriptionLinkOk(3);
            } else {
              setDescriptionLinkOk(2);
            }

            if (
              moment
                .duration(response.data.items[0].contentDetails.duration)
                .asMinutes() &&
              response.data.items[0].snippet.description
                .toLowerCase()
                .includes('caminho')
            ) {
              await axios.post('/api/cobogo/createVideo', {
                title: response.data.items[0].snippet.title,
                description: response.data.items[0].snippet.description,
                video_id: item.id.videoId,
              });

              await axios
                .put(`/api/cobogo/updateProfile`, {
                  waitlist: true,
                })
                .then(() => {
                  setIsLoading(false);
                });
            } else {
              setIsLoading(false);
            }
          });
      });
    } else {
      setTwoMinutesOk(2);
      setCobogoTitleOk(2);
      setDescriptionLinkOk(2);
    }
  }

  function handlePushToNextStep() {
    push('/submit/invite');
  }

  return (
    <>
      <Loading isLoading={isLoading} />

      <div className="flex flex-col">
        <p className="text-4xl text-white mb-4">video</p>

        <p className="text-base sm:text-xl text-white sm:w-[408px] mb-8">
          {`to join the waitlist and earn CBG, you'll have to make a video
          presenting cobogo to your community, so they'll be ready to support
          you when the time comes!`}
        </p>

        <div className="mb-4">
          {twoMinutesOk === 1 && <Bullet text="longer than 2 minutes" />}

          {twoMinutesOk === 2 && <WarningBullet text="longer than 2 minutes" />}

          {twoMinutesOk === 3 && <SuccessBullet text="longer than 2 minutes" />}

          <p className="text-graylight sm:w-[408px] pl-9">
            {`we believe that in order to explain what cobogo is about, that is, a
          platform to monetize your work, and to let your community know how
          they'll be able to support you, a video of at least 2 minutes is
          necessary.`}
          </p>
        </div>

        <div className="mb-4">
          {cobogoTitleOk === 1 && (
            <Bullet text='have the name "cobogo" in the title' />
          )}

          {cobogoTitleOk === 2 && (
            <WarningBullet text='have the name "cobogo" in the title' />
          )}

          {cobogoTitleOk === 3 && (
            <SuccessBullet text='have the name "cobogo" in the title' />
          )}

          <p className="text-graylight sm:w-[408px] pl-9">
            {`to make it easier to find and identify your video, we require you to put the name "cobogo" in the title.`}
          </p>
        </div>

        <div className="mb-8">
          {descriptionLinkOk === 1 && (
            <Bullet
              text="link to"
              link={`https://app.cobogo.social/${channelHandle}`}
            />
          )}

          {descriptionLinkOk === 2 && (
            <WarningBullet
              text="link to"
              link={`https://app.cobogo.social/${channelHandle}`}
            />
          )}

          {descriptionLinkOk === 3 && (
            <SuccessBullet
              text="link to"
              link={`https://app.cobogo.social/${channelHandle}`}
            />
          )}

          <p className="text-graylight sm:w-[408px] pl-9">
            {`lastly, you will need to put the link to your staking page in the video description box so that your community can find you on cobogo, and support you!`}
          </p>
        </div>
        {twoMinutesOk === 1 && descriptionLinkOk === 1 && (
          <Button
            width="w-40"
            height="h-9"
            color="bg-blue"
            hoverColor="brightness-90"
            text="verify video"
            onClick={handleVerifyVideo}
          />
        )}

        {twoMinutesOk === 2 && descriptionLinkOk === 2 && (
          <Button
            width="w-40"
            height="h-9"
            color="bg-blue"
            hoverColor="brightness-90"
            text="verify again"
            onClick={handleVerifyVideo}
          />
        )}

        {twoMinutesOk === 3 && descriptionLinkOk === 3 && (
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
