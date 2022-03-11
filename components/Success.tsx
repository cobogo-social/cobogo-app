import ChannelBanner from './ChannelBanner';
import StepWrapper from './StepWrapper';
import StatsTopBar from './StatsTopBar';
import WaitlistContainer from './WaitlistContainer';

interface SuccessProps {
  banner: string;
  title: string;
  description: string;
  referralCode: string;
}

export default function Success({ banner, title, description }: SuccessProps) {
  return (
    <div className="bg-primary w-full h-screen sm:h-full p-8">
      <StatsTopBar />

      <StepWrapper>
        <div className="flex flex-col">
          <WaitlistContainer title={title} />
        </div>

        <ChannelBanner
          banner={banner}
          title={title}
          description={description}
        />
      </StepWrapper>
    </div>
  );
}
