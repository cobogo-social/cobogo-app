import { GetServerSideProps } from 'next';
import Bullet from './Bullet';
import Button from './Button';
import youtubeApi from '../services/youtubeApi';
import cobogoApi from '../services/cobogoApi';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function VerifyVideoContainer(props) {
  const { data: session } = useSession();
  const { push } = useRouter();

  async function handleVerifyVideo() {
    const response = await youtubeApi.get(
      `/search?part=snippet&forMine=true&maxResults=1&q=windows&type=video&key=${props.nextPublicYoutubeApiKey}`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    if (
      response.data.items[0].snippet.title.includes('WINDOWS') &&
      response.data.items[0].snippet.description.includes(
        'Obrigado por assistir!'
      )
    ) {
      const createdProfile = await cobogoApi.get(
        `/api/profiles?filters[account_email][$eq]=${session?.user.email}`
      );

      await cobogoApi.put(`/api/profiles/${createdProfile.data.data[0].id}`, {
        data: {
          waitlist: true,
        },
      });
    }
  }

  useEffect(() => {
    cobogoApi
      .get(`/api/profiles?filters[account_email][$eq]=${session?.user.email}`)
      .then(async (response) => {
        if (response.data.data[0].attributes.waitlist) {
          push('/submit/review');
        }
      });
  }, [push, session?.user.email]);

  return (
    <div className="flex flex-col">
      <p className="text-4xl text-white mb-4">video</p>
      <p className="text-xl text-white w-[408px] mb-12">
        almost there! To unlock the stake function on your channel, you need to
        record and post a video to your YouTube channel following these rules:
      </p>

      <div className="mb-5">
        <Bullet text="longer than 2 minutes" />
      </div>
      <div className="mb-5">
        <Bullet text='have the name "cobogo" in the title' />
      </div>
      <div className="mb-10">
        <Bullet text="link to" link="https://cobogo.social/space-official" />
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
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      nextPublicYoutubeApiKey: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
    },
  };
};
