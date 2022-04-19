import Badge from '@components/others/Badge';
import Image from 'next/image';

interface BlankslateChannelBoxProps {
  banner: string;
  title: string;
}

export default function BlankslateChannelBox({
  banner,
  title,
}: BlankslateChannelBoxProps) {
  return (
    <div
      className={`bg-black w-[310px] sm:w-[680px] ${
        banner && 'sm:h-[498px]'
      } border-[1.5px] border-gray5 mb-[50px] relative`}
    >
      <div className="hidden sm:flex">
        {banner ? (
          <Image
            src={banner}
            width={677}
            height={108}
            objectFit="cover"
            alt={banner}
          />
        ) : null}
      </div>

      <div className="flex sm:hidden">
        {banner ? (
          <Image
            src={banner}
            width={308}
            height={48}
            objectFit="cover"
            alt={banner}
          />
        ) : null}
      </div>

      <div className="absolute top-0 flex items-center justify-start w-full p-4 sm:p-8">
        {banner ? <Badge title={title} /> : null}
      </div>

      <div className="w-full px-8 py-8">
        <p className="mb-[10px] sm:mb-[32px] text-2xl sm:text-5xl">
          coming soon...
        </p>

        <p className="sm:text-xl mb-[17px] sm:mb-[50px]">
          <span className="font-bold">cobogo</span> is an alternative
          monetization mechanism that leverages{' '}
          <span className="font-bold">blockchain</span> to enable{' '}
          <span className="font-bold">Content Creators</span> to fund themselves
          sustainably through their own community.
        </p>

        <p className="sm:text-xl">
          in the near future you will be able to support this channel by
          depositing <span className="font-bold">CBG tokens</span> in their{' '}
          <span className="font-bold">Staking Pool</span>, and you both will get
          rewards.
        </p>
      </div>
    </div>
  );
}
