import BlankslateBand from './BlankslateBand';
import BlankslateChannelBanner from './BlankslateChannelBanner';

interface BlankslateProps {
  banner: string;
  title: string;
  referralCode: string;
  connectWallet: () => void;
  isError: boolean;
  setIsError: (value: boolean) => void;
  currentAccount: string;
}

export default function Blankslate({
  banner,
  title,
  referralCode,
  connectWallet,
  isError,
  setIsError,
  currentAccount,
}: BlankslateProps) {
  return (
    <div className="flex flex-col items-center w-full">
      <BlankslateChannelBanner banner={banner} title={title} />

      <BlankslateBand
        referralCode={referralCode}
        connectWallet={connectWallet}
        isError={isError}
        setIsError={setIsError}
        currentAccount={currentAccount}
      />
    </div>
  );
}
