import Bullet from './Bullet';
import Button from './Button';
import { signIn, useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loading from './Loading';
import axios from 'axios';

interface VerifyVideoContainerProps {
  channelHandle: string;
}

export default function VerifyVideoContainer({
  channelHandle,
}: VerifyVideoContainerProps) {
  const [verifiedVideo, setVerifiedVideo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();
  const { push } = useRouter();

  async function handleVerifyVideo() {
    setIsLoading(true);

    const response = await axios.get(`/api/youtube/readVideo`, {
      params: {
        accessToken: session.accessToken,
      },
    });

    if (
      response.data.items[0].snippet.title.includes('WINDOWS') &&
      response.data.items[0].snippet.description.includes(
        'Obrigado por assistir!'
      )
    ) {
      const createdProfile = await axios.get(`/api/cobogo/readProfileByEmail`, {
        params: {
          email: session?.user.email,
        },
      });

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
  }

  useEffect(() => {
    if (verifiedVideo) {
      push('/submit/review');
    }
  }, [push, verifiedVideo]);

  return (
    <>
      <Loading isLoading={isLoading} />

      <div className="flex flex-col">
        <p className="text-4xl text-white mb-4">video</p>
        <p className="text-xl text-white w-[408px] mb-12">
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
            link={`https://cobogo.social/${channelHandle}`}
          />
        </div>

        <Button
          width="w-32"
          height="h-9"
          color="bg-blue"
          hoverColor="brightness-90"
          text="verify video"
          fontSize=""
          onClick={handleVerifyVideo}
        />
      </div>
    </>
  );
}
