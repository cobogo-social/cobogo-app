import Image from 'next/image';

import Button from './Button';
import Categories from './Categories';

interface MobileProfileChannelBannerProps {
  title: string;
  youtubeSubscribers: number;
  categories: string[];
  openStakeStepsModals: () => void;
  bannerImage: string;
}

export default function MobileProfileChannelBanner({
  title,
  youtubeSubscribers,
  categories,
  openStakeStepsModals,
  bannerImage,
}: MobileProfileChannelBannerProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full sm:hidden mt-[52px]">
      <div className="flex w-full h-[59px] bg-blue mb-[37px] relative">
        {bannerImage ? (
          <Image
            src={bannerImage}
            objectFit="cover"
            layout="fill"
            alt={bannerImage}
          />
        ) : null}
      </div>

      <p className="text-[26px] text-center">{title}</p>

      <p className="text-center mb-[8px]">
        <span className="mr-1 font-bold">{youtubeSubscribers}</span>
        subscribers
      </p>

      <div className="flex justify-center w-full">
        <div>
          <Categories categories={categories} />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center px-[20px] mb-[40px]">
        <div className="flex mb-[9px]">
          <div className="font-bold w-[161px] h-[72px] bg-secondary flex flex-col justify-center items-center mr-[9px]">
            <p>your stake</p>
            <p className="text-gray6">
              <span className="text-blue">-</span> CBG
            </p>
          </div>

          <div className="font-bold w-[161px] h-[72px] bg-secondary flex flex-col justify-center items-center">
            <p>your rewards</p>
            <p className="text-gray6">
              <span className="text-blue">-</span> CBG
            </p>
          </div>
        </div>

        <div className="flex mb-[30px]">
          <div className="font-bold w-[161px] h-[72px] bg-secondary flex flex-col justify-center items-center mr-[9px]">
            <p>total staked</p>
            <p className="text-gray6">
              <span className="text-green">-</span> CBG
            </p>
          </div>

          <div className="font-bold w-[161px] h-[72px] bg-secondary flex flex-col justify-center items-center">
            <p>youtuber rewards</p>
            <p className="text-gray6">
              <span className="text-green">-</span> CBG
            </p>
          </div>
        </div>

        <Button
          text="stake"
          color="bg-blue"
          width="w-full"
          onClick={openStakeStepsModals}
        />
      </div>
    </div>
  );
}
