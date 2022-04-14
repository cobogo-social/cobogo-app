import Image from 'next/image';
import { useEffect } from 'react';

import ChannelBox from './ChannelBox';

interface ReferralDashboardBandProps {
  onboardedFriends: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  channels: any[];
}

export default function ReferralDashboardBand({
  onboardedFriends,
  channels,
}: ReferralDashboardBandProps) {
  useEffect(() => {
    console.log(channels);
  }, [channels]);

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

      <div className="grid items-start w-full grid-cols-5 gap-[15px] auto-cols-auto mb-[95px]">
        {channels.map((item) => (
          <ChannelBox
            key={item.channel.data.id}
            banner={item.channel.data.attributes.banner}
            title={item.channel.data.attributes.title}
            email={item.account.data.attributes.email}
          />
        ))}
      </div>
    </div>
  );
}
