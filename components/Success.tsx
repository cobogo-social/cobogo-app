import ChannelBanner from './ChannelBanner';
import StatsTopBar from './StatsTopBar';
import StepWrapper from './StepWrapper';
import Waitlist from './Waitlist';

interface SuccessProps {
  banner: string;
  title: string;
  description: string;
  referralCode: string;
  profileId: number;
}

export default function Success({
  banner,
  title,
  description,
  profileId,
}: SuccessProps) {
  return (
    <div className="w-full h-full p-8">
      <StatsTopBar profileId={profileId} />

      <StepWrapper>
        <Waitlist title={title} />

        <ChannelBanner
          banner={banner}
          title={title}
          description={description}
        />
      </StepWrapper>
    </div>
  );
}
