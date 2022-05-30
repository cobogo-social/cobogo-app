import ProfileVideo from './ProfileVideo';

interface ProfileVideosProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  videos: any[];
}

export default function ProfileVideos({ videos }: ProfileVideosProps) {
  return (
    <div className="hidden sm:flex flex-col w-full px-[147px] pb-[62px]">
      <p className="text-[22px] mb-[26px]">latest videos</p>

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
