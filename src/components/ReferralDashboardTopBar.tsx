import Image from 'next/image';

interface ReferralDashboardTopBarProps {
  currentAccount: string;
}

export default function ReferralDashboardTopBar({
  currentAccount,
}: ReferralDashboardTopBarProps) {
  return (
    <div className="flex w-full justify-between items-center mb-[70px] px-8 pt-8">
      <Image src="/images/logo.svg" width={120} height={27} alt="logo" />

      {currentAccount && (
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center">
              <Image
                src="/images/metamask-small-icon.svg"
                width={32}
                height={32}
                alt="metamask small icon"
              />

              <p className="flex ml-2 font-bold">
                {currentAccount.slice(0, 5)}...{currentAccount.slice(38)}
              </p>

              <div className="flex w-[9px] h-[9px] bg-green ml-2 rounded-full" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
