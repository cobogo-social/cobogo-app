import Video from './Video';

interface VideosProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  videos: any[];
}

export default function Videos(props: VideosProps) {
  return (
    <div className="hidden sm:flex w-full px-[150px] py-[70px] bg-black justify-center items-center">
      <div className="flex-col w-full max-w-[1000px]">
        <p className="text-[22px] mb-6 w-full justify-start items-start">
          latest videos
        </p>

        <div className="flex gap-10">
          {props.videos.map((video) => (
            <Video
              key={video.id.videoId}
              title={video.snippet.title}
              videoId={video.id.videoId}
              thumbnail={video.snippet.thumbnails.high.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
