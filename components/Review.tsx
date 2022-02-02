import ChannelApprovedContainer from './ChannelApprovedContainer';
import ChannelBanner from './ChannelBanner';
import ChannelDeniedContainer from './ChannelDeniedContainer';
import TopBar from './TopBar';
import UnderAnalysisContainer from './UnderAnalysisContainer';

export default function Review() {
  const channelStatus = 'channel approved';

  return (
    <div className="bg-primary w-full h-full p-8">
      <TopBar />
      <div className="flex flex-row justify-between items-start px-16">
        {/* {channelStatus === 'under analysis' && <UnderAnalysisContainer />} */}
        {channelStatus === 'channel approved' && <ChannelApprovedContainer />}
        {/* {channelStatus === 'channel denied' && <ChannelDeniedContainer />} */}
        <ChannelBanner />
      </div>
    </div>
  );
}
