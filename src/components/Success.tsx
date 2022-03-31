import ChannelBanner from './ChannelBanner';
import StatsTopBar from './StatsTopBar';
import StepContainer from './StepContainer';
import StepWrapper from './StepWrapper';
import Waitlist from './Waitlist';

interface SuccessProps {
  banner: string;
  title: string;
  description: string;
  onboardedFriends: number;
}

export default function Success({
  banner,
  title,
  description,
  onboardedFriends,
}: SuccessProps) {
  return (
    <StepContainer>
      <StatsTopBar onboardedFriends={onboardedFriends} />

      <StepWrapper>
        <Waitlist title={title} />

        <ChannelBanner
          banner={banner}
          title={title}
          description={description}
        />
      </StepWrapper>
    </StepContainer>
  );
}
