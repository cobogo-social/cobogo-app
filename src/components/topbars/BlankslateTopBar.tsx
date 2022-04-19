import Image from 'next/image';

interface BlankslateTopBarProps {
  onboardedFriends: number;
  currentAccount: string;
  tokens: number;
}

export default function BlankslateTopBar({
  onboardedFriends,
  currentAccount,
  tokens,
}: BlankslateTopBarProps) {
  return (
    <div className="flex w-full justify-between items-center mb-[70px] px-8 pt-8">
      <Image src="/images/logo.svg" width={120} height={27} alt="logo" />

      {currentAccount && (
        <div className="flex items-center justify-center">
          <p className="mr-8">
            onboarded friends:{' '}
            <span className="font-bold text-green">{onboardedFriends}</span>
          </p>

          <div className="flex items-center justify-center">
            <div className="flex mr-2">
              <Image
                src="/images/cbg-icon.svg"
                width={24}
                height={21}
                alt="cbg icon"
              />
            </div>

            <p className="flex mr-8 font-bold">{tokens} CBG</p>

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
