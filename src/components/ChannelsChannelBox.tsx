import Image from 'next/image';

import Button from './Button';
import Link from './Link';

interface ChannelsChannelBoxProps {
  bannerImage: string;
  title: string;
  description: string;
  handle: string;
}

export default function ChannelsChannelBox({
  bannerImage,
  title,
  description,
  handle,
}: ChannelsChannelBoxProps) {
  return (
    <div className="flex flex-col w-[768px] h-[340px] bg-black justify-between border-[1.5px] border-gray5 mt-[40px]">
      {bannerImage ? (
        <Image
          src={bannerImage}
          objectFit="cover"
          width={766}
          height={121}
          alt={bannerImage}
        />
      ) : (
        <div className="bg-blue w-full h-[121px]" />
      )}

      <div className="px-[30px]">
        <p className="text-[22px] mb-[14px]">{title}</p>

        <p>{description.slice(0, 154)} (...)</p>
      </div>

      <div className="bg-secondary w-full h-[78px] flex justify-between items-center px-[30px]">
        <div className="flex w-full">
          <div className="flex flex-col mr-[30px]">
            <p className="font-bold">your stake</p>

            <p className="font-bold text-gray6">
              <span className="text-blue">-</span> CBG
            </p>
          </div>

          <div className="flex flex-col mr-[30px]">
            <p className="font-bold">your rewards</p>

            <p className="font-bold text-gray6">
              <span className="text-blue">-</span> CBG
            </p>
          </div>

          <div className="flex flex-col mr-[30px]">
            <p className="font-bold">total staked</p>

            <p className="font-bold text-gray6">
              <span className="text-green">-</span> CBG
            </p>
          </div>

          <div className="flex flex-col">
            <p className="font-bold">youtuber rewards</p>

            <p className="font-bold text-gray6">
              <span className="text-green">-</span> CBG
            </p>
          </div>
        </div>

        <div className="flex">
          <Link href={`/profiles/${handle}`}>
            <Button
              text="more info"
              color="bg-blue"
              hoverColor="brightness-90"
              width="w-[114px]"
              height="h-[38px]"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
