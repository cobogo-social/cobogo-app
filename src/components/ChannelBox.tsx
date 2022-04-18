import Image from 'next/image';

interface ChannelBoxProps {
  banner: string;
  title: string;
  email: string;
  status: string;
}

export default function ChannelBox({
  banner,
  title,
  email,
  status,
}: ChannelBoxProps) {
  return (
    <div className="mb-[30px] w-[277px] h-[193px] bg-black border-[1.5px] border-gray5 flex flex-col justify-center">
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

      <p className="font-bold text-xs text-gray3 px-4">{email}</p>

      <p
        className={`font-bold text-xs ${
          status ? 'text-green' : 'text-red'
        } mb-[30px] px-4`}
      >
        {status ? 'onboarded' : 'pending'}
      </p>

      <div className="flex px-4 mb-6">
        <div className="flex mr-2">
          <Image
            src="/images/cbg-icon.svg"
            width={24}
            height={21}
            alt="cbg icon"
          />
        </div>

        <p className="font-bold">{status ? 50 : 0} CBG</p>
      </div>
    </div>
  );
}
