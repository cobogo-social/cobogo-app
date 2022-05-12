import Image from 'next/image';

import Button from './Button';
import Link from './Link';

interface MobileChannelsChannelBoxProps {
  bannerImage: string;
  title: string;
  description: string;
  handle: string;
}

export default function MobileChannelsChannelBox({
  bannerImage,
  title,
  description,
  handle,
}: MobileChannelsChannelBoxProps) {
  return (
    <div className="flex sm:hidden flex-col w-[310px] h-[429px] bg-black justify-start border-[1.5px] border-gray5 mt-[30px]">
      {bannerImage ? (
        <Image
          src={bannerImage}
          objectFit="cover"
          width={308}
          height={48}
          alt={bannerImage}
        />
      ) : (
        <div className="bg-blue w-full h-[48px]" />
      )}

      <div className="flex flex-col h-[381px] justify-between p-[30px]">
        <div>
          <p className="text-[22px] mb-[10px]">{title}</p>

          <p>{description.slice(0, 154)} (...)</p>
        </div>

        <div className="flex flex-col">
          <div className="flex justify-between w-full mb-[22px]">
            <div className="flex flex-col">
              <div className="flex flex-col mr-[30px] mb-[11px]">
                <p className="font-bold">your stake</p>

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
            </div>

            <div className="flex flex-col">
              <div className="flex flex-col mr-[30px] mb-[11px]">
                <p className="font-bold">your rewards</p>

                <p className="font-bold text-gray6">
                  <span className="text-blue">-</span> CBG
                </p>
              </div>

              <div className="flex flex-col">
                <p className="font-bold">youtuber rewards</p>

                <p className="font-bold text-gray6">
                  <span className="text-green">-</span> CBG
                </p>
              </div>
            </div>
          </div>

          <Link href={`/profiles/${handle}`}>
            <Button text="more info" color="bg-blue" width="w-full" />
          </Link>
        </div>
      </div>
    </div>
  );
}
