import Image from 'next/image';

interface BlankslateStatsTopBarProps {
  onboardedFriends: number;
}

export default function BlankslateStatsTopBar({
  onboardedFriends,
}: BlankslateStatsTopBarProps) {
  return (
    <div className="flex w-full justify-end items-center mb-[70px]">
      <p className="text-white mr-8">
        onboarded friends: <span className="font-bold">{onboardedFriends}</span>
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

        <p className="text-white font-bold">
          {100 + onboardedFriends * 50} CBG
        </p>
      </div>
    </div>
  );
}
