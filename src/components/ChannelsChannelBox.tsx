import Button from './Button';

export default function ChannelsChannelBox() {
  return (
    <div className="flex flex-col w-[768px] h-[340px] bg-black justify-between border-[1.5px] border-gray5 mt-[40px]">
      <div className="bg-blue w-full h-[121px]" />

      <div className="px-[30px]">
        <p className="text-[22px] mb-[14px]">Channel Name</p>

        <p>
          Follow the latest Rocket launch webcasts, Conferences & more
          space-related Livestream events. SPACE (Official) provides a Platform
          for Aerospace companies (...)
        </p>
      </div>

      <div className="bg-secondary w-full h-[78px] flex justify-between items-center px-[30px]">
        <div className="flex w-full">
          <div className="flex flex-col mr-[30px]">
            <p className="font-bold">your stake</p>

            <p className="font-bold text-gray6">
              <span className="text-blue">XXXX</span> CBG
            </p>
          </div>

          <div className="flex flex-col mr-[30px]">
            <p className="font-bold">your rewards</p>

            <p className="font-bold text-gray6">
              <span className="text-blue">XX</span> CBG
            </p>
          </div>

          <div className="flex flex-col mr-[30px]">
            <p className="font-bold">total staked</p>

            <p className="font-bold text-gray6">
              <span className="text-green">XXXXX</span> CBG
            </p>
          </div>

          <div className="flex flex-col">
            <p className="font-bold">youtuber rewards</p>

            <p className="font-bold text-gray6">
              <span className="text-green">XXXX</span> CBG
            </p>
          </div>
        </div>

        <div className="flex">
          <Button
            text="more info"
            color="bg-blue"
            hoverColor="brightness-90"
            width="w-[114px]"
            height="h-[38px]"
          />
        </div>
      </div>
    </div>
  );
}
