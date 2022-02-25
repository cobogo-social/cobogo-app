import Link from 'next/link';
import Button from './Button';
import ChannelBanner from './ChannelBanner';
import ReferralContainer from './ReferralContainer';
import TopBar from './TopBar';

interface InviteProps {
  banner: string;
  title: string;
  description: string;
  referralCode: string;
}

export default function Invite({
  banner,
  title,
  description,
  referralCode,
}: InviteProps) {
  return (
    <div className="bg-primary w-full h-full p-8">
      <TopBar />
      <div className="flex flex-row justify-between items-start px-16 2xl:px-64">
        <div className="flex flex-col">
          <ReferralContainer referralCode={referralCode} />

          <Link href="/submit/success">
            <Button
              width="w-32"
              height="h-9"
              color="bg-blue"
              hoverColor="brightness-90"
              text="next step"
            />
          </Link>
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
