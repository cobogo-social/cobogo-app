import ChannelApprovedContainer from './ChannelApprovedContainer';
import ChannelBanner from './ChannelBanner';
import ChannelDeniedContainer from './ChannelDeniedContainer';
import TopBar from './TopBar';
import UnderAnalysisContainer from './UnderAnalysisContainer';
import WaitlistContainer from './WaitlistContainer';

export default function Review(props) {
  const channelStatus = 'waitlist';

  return (
    <div className="bg-primary w-full h-full p-8">
      <TopBar />
      <div className="flex flex-row justify-between items-start px-16">
        {channelStatus === 'waitlist' && <WaitlistContainer />}
        {/*channelStatus === 'under analysis' && <UnderAnalysisContainer />*/}
        {/* {channelStatus === 'channel approved' && <ChannelApprovedContainer />} */}
        {/* {channelStatus === 'channel denied' && <ChannelDeniedContainer />} */}
        <ChannelBanner channelData={props} />
      </div>
    </div>
  );
}
