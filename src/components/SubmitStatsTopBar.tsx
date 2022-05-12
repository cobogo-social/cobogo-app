import TokenInfo from '@components/TokenInfo';

interface SubmitStatsTopBarProps {
  onboardedFriends: number;
  tokens: number;
}

export default function SubmitStatsTopBar({
  onboardedFriends,
  tokens,
}: SubmitStatsTopBarProps) {
  return (
    <div className="hidden sm:flex w-full justify-end items-center mb-[70px]">
      <p className="mr-8">
        onboarded friends:{' '}
        <span className="font-bold text-green">{onboardedFriends}</span>
      </p>

      <div className="mr-8">
        <TokenInfo tokens={tokens} />
      </div>
    </div>
  );
}
