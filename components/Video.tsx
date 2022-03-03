import ChannelBanner from './ChannelBanner';
import StepWrapper from './StepWrapper';
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
    <div className="bg-primary w-full h-screen sm:h-full p-8">
      <TopBar />

      <StepWrapper>
        <VerifyVideoContainer
          channelHandle={channelHandle}
          channelId={channelId}
        />

        <ChannelBanner
          banner={banner}
          title={title}
          description={description}
        />
      </StepWrapper>
    </div>
  );
}
