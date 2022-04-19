import Image from 'next/image';

interface StatsTopBarProps {
  onboardedFriends: number;
  tokens: number;
}

export default function StatsTopBar({
  onboardedFriends,
  tokens,
}: StatsTopBarProps) {
  return (
    <div className="hidden sm:flex w-full justify-end items-center mb-[70px]">
      <p className="mr-8">
        onboarded friends:{' '}
        <span className="font-bold text-green">{onboardedFriends}</span>
      </p>

      <div className="flex">
        <div className="flex mr-2">
          <Image
            src="/images/cbg-icon.svg"
            width={24}
            height={21}
            alt="cbg icon"
          />
        </div>

        <p className="font-bold">{tokens} CBG</p>
      </div>
    </div>
  );
}
