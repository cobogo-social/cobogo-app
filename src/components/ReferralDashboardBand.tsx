import ReferralDashboardChannelBox from '@components/ReferralDashboardChannelBox';
import TokenInfo from '@components/TokenInfo';

interface ReferralDashboardBandProps {
  onboardedFriends: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onboardedFriendsChannels: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pendingFriendsChannels: any[];
  currentAccount: string;
  tokens: number;
}

export default function ReferralDashboardBand({
  onboardedFriends,
  onboardedFriendsChannels,
  pendingFriendsChannels,
  currentAccount,
  tokens,
}: ReferralDashboardBandProps) {
  return (
    <div className="w-full min-h-[455px] bg-secondary flex flex-col justify-start items-start px-[30px] sm:px-[204px] pt-[85px]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full mb-[31px]">
        {currentAccount ? (
          <p className="text-[26px] sm:text-[40px] flex">
            onboarded friends (
            <span className="text-green">{onboardedFriends}</span>)
          </p>
        ) : (
          <p className="text-[40px] flex">connect wallet to view information</p>
        )}

        {currentAccount && (
          <div className="mr-8">
            <TokenInfo tokens={tokens} />
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-start justify-center sm:justify-start w-full mb-[95px]">
        {onboardedFriendsChannels.map((item) => (
          <ReferralDashboardChannelBox
            key={item.id}
            banner={item.profiles.data[0].attributes.banner_image}
            title={item.profiles.data[0].attributes.title}
            email={item.email}
            status={item.profiles.data[0].attributes.waitlist}
          />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full mb-[31px]">
        {currentAccount ? (
          <p className="text-[26px] sm:text-[40px] flex">
            pending friends (
            <span className="text-red">{onboardedFriends}</span>)
          </p>
        ) : (
          <p className="text-[40px] flex">connect wallet to view information</p>
        )}
      </div>

      <div className="flex flex-wrap items-start justify-center sm:justify-start w-full mb-[95px]">
        {pendingFriendsChannels.map((item) => (
          <ReferralDashboardChannelBox
            key={item.id}
            banner={item.profiles.data[0].attributes.banner_image}
            title={item.profiles.data[0].attributes.title}
            email={item.email}
            status={item.profiles.data[0].attributes.waitlist}
          />
        ))}
      </div>
    </div>
  );
}
