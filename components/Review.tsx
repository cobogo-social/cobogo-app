import ChannelApprovedContainer from './ChannelApprovedContainer';
import ChannelBanner from './ChannelBanner';
import ChannelDeniedContainer from './ChannelDeniedContainer';
import ReferralContainer from './ReferralContainer';
import TopBar from './TopBar';
import WaitlistContainer from './WaitlistContainer';

interface ReviewProps {
  banner: string;
  title: string;
  description: string;
  channelHandle: string;
}

export default function Review({
  banner,
  title,
  description,
  channelHandle,
}: ReviewProps) {
  return (
    <div className="bg-primary w-full h-full p-8">
      <TopBar />
      <div className="flex flex-row justify-between items-start px-16 2xl:px-64">
        <div className="flex flex-col">
          <WaitlistContainer title={title} />
          <ReferralContainer channelHandle={channelHandle} />
        </div>

        <ChannelBanner
          banner={banner}
          title={title}
          description={description}
        />
      </div>
    </div>
  );
}
