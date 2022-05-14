import Image from 'next/image';

import Button from './Button';
import Link from './Link';

interface ChannelsChannelBannerProps {
  bannerImage: string;
  title: string;
  description: string;
  youtubeChannelId: string;
  handle: string;
}

export default function ChannelsChannelBanner({
  bannerImage,
  title,
  description,
  youtubeChannelId,
  handle,
}: ChannelsChannelBannerProps) {
  return (
    <div className="h-[467px] w-full bg-blue relative hidden sm:flex justify-center items-start">
      {bannerImage ? (
        <Image
          src={bannerImage}
          objectFit="cover"
          layout="fill"
          alt={bannerImage}
        />
      ) : null}

      <p className="text-[40px] mt-[122px]">
        discover new channels and start staking
      </p>

      <div className="w-full h-[179px] absolute bg-black/[0.8] bottom-0 flex justify-between items-center px-[39px]">
        <div>
          <p className="text-[40px]">{title}</p>
          <p className="max-w-[667px]">{description.slice(0, 154)} (...)</p>
        </div>

        <div className="flex flex-col items-end">
          <div className="flex mb-[17px]">
            <div className="flex flex-col mr-[30px] items-end">
              <p className="font-bold">your stake</p>

              <p className="font-bold text-gray6">
                <span className="text-blue">-</span> CBG
              </p>
            </div>

            <div className="flex flex-col mr-[30px] items-end">
              <p className="font-bold">your rewards</p>

              <p className="font-bold text-gray6">
                <span className="text-blue">-</span> CBG
              </p>
            </div>

            <div className="flex flex-col mr-[30px] items-end">
              <p className="font-bold">total staked</p>

              <p className="font-bold text-gray6">
                <span className="text-green">-</span> CBG
              </p>
            </div>

            <div className="flex flex-col items-end">
              <p className="font-bold">youtuber rewards</p>

              <p className="font-bold text-gray6">
                <span className="text-green">-</span> CBG
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="mr-[25px]">
              <a
                href={`https://www.youtube.com/channel/${youtubeChannelId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  text="visit channel"
                  color="bg-gray2"
                  width="w-[139px]"
                  height="h-[38px]"
                />
              </a>
            </div>

            <Link href={`/${handle}`}>
              <Button
                text="more info"
                color="bg-blue"
                width="w-[114px]"
                height="h-[38px]"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
