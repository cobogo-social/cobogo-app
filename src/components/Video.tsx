import ChannelBanner from './ChannelBanner';
import StepContainer from './StepContainer';
import StepWrapper from './StepWrapper';
import TopBar from './TopBar';
import VerifyVideo from './VerifyVideo';

interface VideoProps {
  banner: string;
  title: string;
  description: string;
  channelHandle: string;
}

export default function Video({
  banner,
  title,
  description,
  channelHandle,
}: VideoProps) {
  return (
    <StepContainer>
      <TopBar />

      <StepWrapper>
        <VerifyVideo channelHandle={channelHandle} />

        <ChannelBanner
          banner={banner}
          title={title}
          description={description}
        />
      </StepWrapper>
    </StepContainer>
  );
}
