import Button from './Button';

export default function ChannelsChannelBanner() {
  return (
    <div className="h-[467px] w-full bg-blue relative flex justify-center items-start">
      <p className="text-[40px] mt-[122px]">
        discover new channels and start staking
      </p>

      <div className="w-full h-[179px] absolute bg-black/[0.8] bottom-0 flex justify-between items-center px-[145px]">
        <div>
          <p className="text-[40px]">Channel Name</p>
          <p className="max-w-[667px]">
            Follow the latest Rocket launch webcasts, Conferences & more
            space-related Livestream events. SPACE (Official) provides a
            Platform for Aerospace companies (...)
          </p>
        </div>

        <div className="flex flex-col items-end">
          <div className="flex mb-[17px]">
            <div className="flex flex-col mr-[30px] items-end">
              <p className="font-bold">your stake</p>

              <p className="font-bold text-gray6">
                <span className="text-blue">XXXX</span> CBG
              </p>
            </div>

            <div className="flex flex-col mr-[30px] items-end">
              <p className="font-bold">your rewards</p>

              <p className="font-bold text-gray6">
                <span className="text-blue">XX</span> CBG
              </p>
            </div>

            <div className="flex flex-col mr-[30px] items-end">
              <p className="font-bold">total staked</p>

              <p className="font-bold text-gray6">
                <span className="text-green">XXXXX</span> CBG
              </p>
            </div>

            <div className="flex flex-col items-end">
              <p className="font-bold">youtuber rewards</p>

              <p className="font-bold text-gray6">
                <span className="text-green">XXXX</span> CBG
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="mr-[25px]">
              <Button
                text="visit channel"
                color="bg-gray2"
                hoverColor="brightness-90"
                width="w-[139px]"
                height="h-[38px]"
              />
            </div>

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
    </div>
  );
}
