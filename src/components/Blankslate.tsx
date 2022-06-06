import BlankslateBand from '@components/BlankslateBand';
import BlankslateChannelBox from '@components/BlankslateChannelBox';

interface BlankslateProps {
  bannerImage: string;
  title: string;
  referralCode: string;
  connectWallet: () => void;
  currentWallet: string;
}

export default function Blankslate({
  bannerImage,
  title,
  referralCode,
  connectWallet,
  currentWallet,
}: BlankslateProps) {
  return (
    <div className="flex flex-col items-center w-full pt-[93px]">
      <BlankslateChannelBox banner={bannerImage} title={title} />

      <BlankslateBand
        referralCode={referralCode}
        connectWallet={connectWallet}
        currentWallet={currentWallet}
      />
    </div>
  );
}
