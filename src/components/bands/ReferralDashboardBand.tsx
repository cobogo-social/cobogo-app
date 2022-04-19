import ReferralDashboardChannelBox from '@components/channelboxes/ReferralDashboardChannelBox';
import TokenInfo from '@components/others/TokenInfo';
import Image from 'next/image';

interface ReferralDashboardBandProps {
  onboardedFriends: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  channels: any[];
  currentAccount: string;
  tokens: number;
}

export default function ReferralDashboardBand({
  onboardedFriends,
  channels,
  currentAccount,
  tokens,
}: ReferralDashboardBandProps) {
  return (
    <div className="w-full min-h-[455px] bg-secondary flex flex-col justify-start items-start px-[204px] pt-[85px]">
      <div className="flex items-center justify-between w-full mb-[31px]">
        {currentAccount ? (
          <p className="text-[40px] flex">
            onboarded friends (
            <span className="text-green">{onboardedFriends}</span>)
          </p>
        ) : (
          <p className="text-[40px] flex">connect wallet to view information</p>
        )}

        {currentAccount && (
          <div className="flex">
            <div className="flex mr-2">
              <Image
                src="/images/cbg-icon.svg"
                width={24}
                height={21}
                alt="cbg icon"
              />
            </div>

            <TokenInfo tokens={tokens} />
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-start justify-between w-full mb-[95px]">
        {channels.map((item) => (
          <ReferralDashboardChannelBox
            key={item.channel.data.id}
            banner={item.channel.data.attributes.banner}
            title={item.channel.data.attributes.title}
            email={item.account.data.attributes.email}
            status={item.waitlist}
          />
        ))}
      </div>
    </div>
  );
}
