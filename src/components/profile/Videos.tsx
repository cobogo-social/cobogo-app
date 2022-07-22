import Video from './Video';

interface VideosProps {
  videos: any[];
}

export default function Videos(props: VideosProps) {
  return props.videos ? (
    <div className="flex w-full py-10 sm:px-[150px] px-5 sm:py-[70px] bg-black justify-center items-center">
      <div className="flex-col w-full max-w-[1010px]">
        <p className="text-[22px] mb-6 w-full justify-start items-start">
          latest YouTube videos
        </p>

        <div className="flex gap-5 sm:gap-10 overflow-auto">
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
  ) : null;
}
