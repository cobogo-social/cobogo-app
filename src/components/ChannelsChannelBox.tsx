import { LoadingContext } from '@contexts/LoadingContext';
import Image from 'next/image';
import { useContext } from 'react';

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
  const { setLoading } = useContext(LoadingContext);

  return (
    <>
      <div className="hidden sm:flex flex-col w-[768px] h-[340px] bg-black justify-between border border-gray10 mt-[40px] shadow-[0_0px_4px_4px_rgba(0,0,0,0.25)]">
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
            <Link href={`/${handle}`}>
              <Button
                text="more info"
                color="bg-blue"
                width="w-[114px]"
                height="h-[38px]"
                onClick={() => setLoading(true)}
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex sm:hidden flex-col w-[310px] h-[429px] bg-black justify-start border border-gray10 mt-[30px] shadow-[0_0px_4px_4px_rgba(0,0,0,0.25)]">
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

            <Link href={`/${handle}`}>
              <Button
                onClick={() => setLoading(true)}
                text="more info"
                color="bg-blue"
                width="w-full"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
