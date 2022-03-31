import Image from 'next/image';

interface BlankslateChannelBannerProps {
  banner: string;
  title: string;
}

export default function BlankslateChannelBanner({
  banner,
  title,
}: BlankslateChannelBannerProps) {
  return (
    <div className="bg-black sm:w-[768px] max-h-[232px] border-[1.5px] border-details mb-[100px]">
      {banner ? (
        <Image
          src={banner}
          width={766}
          height={121}
          objectFit="cover"
          alt={banner}
        />
      ) : null}

      <div className="w-full px-8 py-4">
        <p className="text-xl text-white">coming soon...</p>

        <p className="text-white">
          soon it will be possible to support the{' '}
          <span className="font-bold">{title}</span> channel through this page.
        </p>
      </div>
    </div>
  );
}
