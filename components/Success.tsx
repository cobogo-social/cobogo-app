import ChannelBanner from './ChannelBanner';
import TopBar from './TopBar';
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
      <TopBar />

      <div className="flex flex-row justify-between items-start pl-16 sm:px-16 2xl:px-64 mt-32 sm:mt-0">
        <div className="flex flex-col">
          <WaitlistContainer title={title} />
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
