import ChannelsCategoriesMenu from '@components/ChannelsCategoriesMenu';
import ChannelsChannelBanner from '@components/ChannelsChannelBanner';
import ChannelsChannelBox from '@components/ChannelsChannelBox';
import ChannelsFilter from '@components/ChannelsFilter';
import ChannelsSearchInput from '@components/ChannelsSearchInput';
import Footer from '@components/Footer';
import MainTopBar from '@components/MainTopBar';
import Image from 'next/image';

export default function Index() {
  return (
    <div className="flex flex-col">
      <MainTopBar />

      <div className="h-[467px] w-full">
        <ChannelsChannelBanner />
      </div>

      <div className="flex">
        <ChannelsCategoriesMenu />

        <div className="w-full px-[100px] py-[40px] flex flex-col justify-start items-center">
          <div className="flex max-w-[771px]">
            <div className="mr-[30px]">
              <ChannelsSearchInput />
            </div>

            <ChannelsFilter />
          </div>

          <ChannelsChannelBox />

          <ChannelsChannelBox />

          <ChannelsChannelBox />

          <div className="mt-[30px]">
            <Image
              src="/images/loading-icon.svg"
              width={107}
              height={27}
              alt="loading icon"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
