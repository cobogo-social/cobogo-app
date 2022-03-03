import axios from 'axios';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Bullet from './Bullet';
import Button from './Button';
import Loading from './Loading';

interface VerifyVideoContainerProps {
  channelHandle: string;
  channelId: string;
}

export default function VerifyVideoContainer({
  channelHandle,
  channelId,
}: VerifyVideoContainerProps) {
  const [verifiedVideo, setVerifiedVideo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();
  const { push } = useRouter();

  async function handleVerifyVideo() {
    setIsLoading(true);

    const response = await axios.get(`/api/youtube/readVideos`, {
      params: {
        accessToken: session.accessToken,
        channelId: channelId,
        q: 'windows',
      },
    });

    if (response.data.items.length) {
      response.data.items.forEach((item) => {
        axios
          .get('/api/youtube/readVideoById', {
            params: {
              accessToken: session.accessToken,
              id: item.id.videoId,
            },
          })
          .then(async (response) => {
            if (
              moment
                .duration(response.data.items[0].contentDetails.duration)
                .asMinutes() > 2 &&
              response.data.items[0].snippet.description
                .toLowerCase()
                .includes('caminho')
            ) {
              await axios.post('/api/cobogo/createVideo', {
                title: response.data.items[0].snippet.title,
                description: response.data.items[0].snippet.description,
                video_id: item.id.videoId,
              });

              const createdProfile = await axios.get(
                `/api/cobogo/readProfileByEmail`,
                {
                  params: {
                    email: session?.user.email,
                  },
                }
              );

              await axios
                .put(
                  `/api/cobogo/updateProfile`,
                  {
                    waitlist: true,
                  },
                  {
                    params: {
                      id: createdProfile.data.data[0].id,
                    },
                  }
                )
                .then(() => {
                  setVerifiedVideo(true);
                  setIsLoading(false);
                });
            }
          });
      });
    }
  }

  useEffect(() => {
    if (verifiedVideo) {
      push('/submit/invite');
    }
  }, [push, verifiedVideo]);

  return (
    <>
      <Loading isLoading={isLoading} />

      <div className="flex flex-col">
        <p className="text-4xl text-white mb-4">video</p>

        <p className="text-base sm:text-xl text-white sm:w-[408px] mb-12">
          almost there! To unlock the stake function on your channel, you need
          to record and post a video to your YouTube channel following these
          rules:
        </p>

        <div className="mb-5">
          <Bullet text="longer than 2 minutes" />
        </div>

        <div className="mb-5">
          <Bullet text='have the name "cobogo" in the title' />
        </div>

        <div className="mb-10">
          <Bullet
            text="link to"
            link={`https://app.cobogo.social/${channelHandle}`}
          />
        </div>

        <Button
          width="w-32"
          height="h-9"
          color="bg-blue"
          hoverColor="brightness-90"
          text="verify video"
          onClick={handleVerifyVideo}
        />
      </div>
    </>
  );
}
