import Image from 'next/image';

interface ProfileVideoProps {
  title: string;
  videoId: string;
  thumbnail: string;
}

export default function Video({
  title,
  videoId,
  thumbnail,
}: ProfileVideoProps) {
  return (
    <div className="flex flex-col">
      <div className="w-[220px] h-[123px] bg-blue mb-4">
        <Image
          src={thumbnail}
          width={220}
          height={123}
          objectFit="cover"
          alt={thumbnail}
        />
      </div>

      <p className="font-bold w-[218px] mb-4">{title}</p>

      <a
        href={`https://www.youtube.com/video/${videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-blue hover:cursor-pointer"
      >
        watch on youtube
      </a>
    </div>
  );
}
