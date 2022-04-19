import TokenInfo from '@components/TokenInfo';
import Image from 'next/image';

interface ReferralDashboardChannelBoxProps {
  banner: string;
  title: string;
  email: string;
  status: string;
}

export default function ReferralDashboardChannelBox({
  banner,
  title,
  email,
  status,
}: ReferralDashboardChannelBoxProps) {
  return (
    <div className="mb-[30px] w-[277px] h-[193px] bg-black border-[1.5px] border-gray5 flex flex-col justify-start">
      {banner ? (
        <Image
          src={banner}
          width={275}
          height={43}
          objectFit="cover"
          alt={title}
        />
      ) : null}

      <p className="px-4 mt-6 text-xl">{title}</p>

      <p className="px-4 text-xs font-bold text-gray3">{email}</p>

      <p
        className={`font-bold text-xs ${
          status ? 'text-green' : 'text-red'
        } mb-[30px] px-4`}
      >
        {status ? 'onboarded' : 'pending'}
      </p>

      <div className="px-4 pb-4">
        <TokenInfo tokens={status ? 50 : 0} />
      </div>
    </div>
  );
}
