import TokenInfo from '@components/others/TokenInfo';

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

      <TokenInfo tokens={tokens} />
    </div>
  );
}
