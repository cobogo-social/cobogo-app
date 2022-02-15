import ChannelApprovedContainer from './ChannelApprovedContainer';
import ChannelBanner from './ChannelBanner';
import ChannelDeniedContainer from './ChannelDeniedContainer';
import TopBar from './TopBar';
import UnderAnalysisContainer from './UnderAnalysisContainer';
import WaitlistContainer from './WaitlistContainer';

interface ReviewProps {
  banner: string;
  title: string;
  description: string;
}

export default function Review({ banner, title, description }: ReviewProps) {
  return (
    <div className="bg-primary w-full h-full p-8">
      <TopBar />
      <div className="flex flex-row justify-between items-start px-16 2xl:px-64">
        <WaitlistContainer title={title} />

        <ChannelBanner
          banner={banner}
          title={title}
          description={description}
        />
      </div>
    </div>
  );
}
