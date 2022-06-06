import Image from 'next/image';

interface ProfileChannelBannerProps {
  bannerImage: string;
  title: string;
  youtubeSubscribers: number;
}

export default function ProfileChannelBanner({
  bannerImage,
  title,
  youtubeSubscribers,
}: ProfileChannelBannerProps) {
  return (
    <div className="h-[207px] w-full bg-blue relative">
      {bannerImage ? (
        <Image
          src={bannerImage}
          objectFit="cover"
          layout="fill"
          alt={bannerImage}
        />
      ) : null}

      <div className="w-full h-[92px] absolute bg-black/[0.8] bottom-0 flex justify-between items-center px-[145px]">
        <p className="text-[40px]">{title}</p>

        <div className="flex">
          <p className="mr-[40px]">
            <span className="mr-1 font-bold">{youtubeSubscribers}</span>
            subscribers
          </p>

          <p>
            <span className="mr-1 font-bold">-</span>
            stakers
          </p>
        </div>
      </div>
    </div>
  );
}