import Link from 'next/link';
import Bullet from './Bullet';
import Button from './Button';
import ChannelBanner from './ChannelBanner';
import TopBar from './TopBar';
import VerifiedVideoContainer from './VerifiedVideoContainer';
import VerifyVideoContainer from './VerifyVideoContainer';

export default function Video() {
  const verified = true;

  return (
    <div className="bg-primary w-full h-full p-8">
      <TopBar />
      <div className="flex flex-row justify-between items-start px-16">
        {verified ? <VerifiedVideoContainer /> : <VerifyVideoContainer />}

        <ChannelBanner />
      </div>
    </div>
  );
}
