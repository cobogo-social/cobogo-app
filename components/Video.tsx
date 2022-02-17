import ChannelBanner from './ChannelBanner';
import TopBar from './TopBar';
import VerifyVideoContainer from './VerifyVideoContainer';

interface VideoProps {
  banner: string;
  title: string;
  description: string;
  channelHandle: string;
  channelId: string;
}

export default function Video({
  banner,
  title,
  description,
  channelHandle,
  channelId,
}: VideoProps) {
  return (
    <div className="bg-primary w-full h-full p-8">
      <TopBar />

      <div className="flex flex-row justify-between items-start px-16 2xl:px-64">
        <VerifyVideoContainer
          channelHandle={channelHandle}
          channelId={channelId}
        />

        <ChannelBanner
          banner={banner}
          title={title}
          description={description}
        />
      </div>
    </div>
  );
}
