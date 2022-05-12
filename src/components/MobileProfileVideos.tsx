import ProfileVideo from './ProfileVideo';

interface MobileProfileVideosProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  videos: any[];
  title: string;
}

export default function MobileProfileVideos({
  videos,
  title,
}: MobileProfileVideosProps) {
  return (
    <div className="flex sm:hidden flex-col w-full px-[20px] py-[32px] bg-secondary overflow-x-auto">
      <p className="text-[22px] mb-[26px]">{title}'s latest videos</p>

      <div className="flex">
        {videos.map((video) => (
          <ProfileVideo
            key={video.id.videoId}
            title={video.snippet.title}
            videoId={video.id.videoId}
            thumbnail={video.snippet.thumbnails.high.url}
          />
        ))}
      </div>
    </div>
  );
}
