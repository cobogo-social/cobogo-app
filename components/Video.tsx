import ChannelBanner from './ChannelBanner';
import TopBar from './TopBar';
import VerifiedVideoContainer from './VerifiedVideoContainer';
import VerifyVideoContainer from './VerifyVideoContainer';

export default function Video(props) {
  const verified = false;

  return (
    <div className="bg-primary w-full h-full p-8">
      <TopBar />
      <div className="flex flex-row justify-between items-start px-16 2xl:px-64">
        {verified ? (
          <VerifiedVideoContainer />
        ) : (
          <VerifyVideoContainer channelData={props} />
        )}

        <ChannelBanner channelData={props} />
      </div>
    </div>
  );
}
