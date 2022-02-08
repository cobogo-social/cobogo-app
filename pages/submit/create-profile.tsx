import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useEffect } from 'react';
import CreateProfile from '../../components/CreateProfile';
import Footer from '../../components/Footer';
import Steps from '../../components/Steps';
import youtubeApi from '../../services/youtubeApi';

interface CreateProfileProps {
  id: string;
  title: string;
  description: string;
  image: string;
  statistics: {
    viewCount: string;
    subscriberCount: string;
    videoCount: string;
  };
}

export default function Index(props) {
  return (
    <div className="w-full">
      <div className="grid grid-rows-[945px_70px] grid-cols-[332px_1fr]">
        <Steps />
        <CreateProfile channelData={props} />

        <Footer />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.user) {
    return {
      redirect: {
        destination: '/submit/connect',
        permanent: false,
      },
    };
  }

  const response = await youtubeApi.get(
    `/channels?part=snippet%2CcontentDetails%2Cstatistics&mine=true&key=${process.env.YOUTUBE_API_KEY}`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  );

  return {
    props: {
      id: response.data.items[0].id,
      title: response.data.items[0].snippet.title,
      description: response.data.items[0].snippet.description,
      image: response.data.items[0].snippet.thumbnails.medium.url,
      statistics: {
        viewCount: response.data.items[0].statistics.viewCount,
        subscriberCount: response.data.items[0].statistics.subscriberCount,
        videoCount: response.data.items[0].statistics.videoCount,
      },
    },
  };
};
