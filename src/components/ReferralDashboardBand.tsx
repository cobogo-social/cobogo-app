import Image from 'next/image';

import ChannelBox from './ChannelBox';

interface ReferralDashboardBandProps {
  onboardedFriends: number;
}

export default function ReferralDashboardBand({
  onboardedFriends,
}: ReferralDashboardBandProps) {
  return (
    <div className="w-full min-h-[455px] bg-secondary flex flex-col justify-start items-start px-[204px] pt-[85px]">
      <div className="flex items-center justify-between w-full mb-[31px]">
        <p className="text-[40px] flex">
          onboarded friends (
          <span className="text-green">{onboardedFriends}</span>)
        </p>

        <div className="flex">
          <div className="flex mr-2">
            <Image
              src="/images/cbg-icon.svg"
              width={24}
              height={21}
              alt="cbg icon"
            />
          </div>

          <p className="font-bold">{100 + onboardedFriends * 50} CBG</p>
        </div>
      </div>

      <div className="flex items-center w-full">
        <ChannelBox banner="" title="thiago0x01" email="thiago@cobogo.social" />
        <ChannelBox banner="" title="thiago0x01" email="thiago@cobogo.social" />
        <ChannelBox banner="" title="thiago0x01" email="thiago@cobogo.social" />
        <ChannelBox banner="" title="thiago0x01" email="thiago@cobogo.social" />
        <ChannelBox banner="" title="thiago0x01" email="thiago@cobogo.social" />
        <ChannelBox banner="" title="thiago0x01" email="thiago@cobogo.social" />
      </div>
    </div>
  );
}
