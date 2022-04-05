import Image from 'next/image';

import Badge from './Badge';

interface BlankslateChannelBannerProps {
  banner: string;
  title: string;
}

export default function BlankslateChannelBanner({
  banner,
  title,
}: BlankslateChannelBannerProps) {
  return (
    <div className="bg-black sm:w-[680px] max-h-[498px] border-[1.5px] border-details mb-[50px] relative">
      {banner ? (
        <Image
          src={banner}
          width={677}
          height={108}
          objectFit="cover"
          alt={banner}
        />
      ) : null}

      <div className="absolute top-0 flex items-center justify-start w-full p-4 sm:p-8">
      {banner ? (
        <Badge title={title} />
      ) : null}
        
      </div>

      <div className="w-full px-8 py-8">
        <p className="mb-[32px] text-2xl sm:text-5xl text-white">
          coming soon...
        </p>

        <p className="sm:text-xl text-white mb-[50px]">
          <span className="font-bold">cobogo</span> is an alternative
          monetization mechanism that leverages{' '}
          <span className="font-bold">blockchain</span> to enable{' '}
          <span className="font-bold">Content Creators</span> to fund themselves
          sustainably through their own community.
        </p>

        <p className="text-white sm:text-xl">
          in the near future you will be able to support this channel by
          depositing <span className="font-bold">CBG tokens</span> in their{' '}
          <span className="font-bold">Staking Pool</span>, and you both will get
          rewards.
        </p>
      </div>
    </div>
  );
}
