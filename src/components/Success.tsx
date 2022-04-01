import { useState } from 'react';

import ChannelBanner from './ChannelBanner';
import Loading from './Loading';
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
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Loading isLoading={isLoading} />

      <StepContainer>
        <StatsTopBar onboardedFriends={onboardedFriends} />

        <StepWrapper>
          <Waitlist title={title} setIsLoading={setIsLoading} />

          <ChannelBanner
            banner={banner}
            title={title}
            description={description}
          />
        </StepWrapper>
      </StepContainer>
    </>
  );
}
