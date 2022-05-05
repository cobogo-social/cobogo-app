import Footer from '@components/Footer';
import MainTopBar from '@components/MainTopBar';
import ProfileAbout from '@components/ProfileAbout';
import ProfileChannelBanner from '@components/ProfileChannelBanner';
import ProfileStatsBand from '@components/ProfileStatsBand';
import ProfileTopStakers from '@components/ProfileTopStakers';
import ProfileVideos from '@components/ProfileVideos';
import { readProfileByHandle } from '@services/cobogoApi';
import { readVideosByChannelId } from '@services/youtubeApi';
import { GetServerSideProps } from 'next';

interface ProfileProps {
  bannerImage: string;
  title: string;
  youtubeSubscribers: number;
  description: string;
  categories: string;
  youtubeChannelId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  videos: any[];
}

export default function Index({
  bannerImage,
  title,
  youtubeSubscribers,
  description,
  categories,
  youtubeChannelId,
  videos,
}: ProfileProps) {
  return (
    <div className="flex flex-col">
      <MainTopBar />

      <div className="h-[299px] w-full">
        <ProfileChannelBanner
          bannerImage={bannerImage}
          title={title}
          youtubeSubscribers={youtubeSubscribers}
        />

        <ProfileStatsBand />
      </div>

      <div className="w-full pt-[62px] px-[147px] flex justify-between items-start">
        <ProfileAbout
          description={description}
          categories={categories}
          youtubeChannelId={youtubeChannelId}
        />

        <ProfileTopStakers />
      </div>

      <ProfileVideos videos={videos} />

      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { handle } = params;

  const profile = await readProfileByHandle(handle);

  if (!profile) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const videos = await readVideosByChannelId(
    profile.attributes.youtube_channel_id,
  );

  return {
    props: {
      bannerImage: profile.attributes.banner_image,
      title: profile.attributes.title,
      youtubeSubscribers: profile.attributes.youtube_subscribers,
      description: profile.attributes.description,
      categories: profile.attributes.categories,
      youtubeChannelId: profile.attributes.youtube_channel_id,
      videos,
    },
  };
};
