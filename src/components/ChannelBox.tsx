import Image from 'next/image';

interface ChannelBoxProps {
  banner: string;
  title: string;
  email: string;
}

export default function ChannelBox({ banner, title, email }: ChannelBoxProps) {
  return (
    <div className="w-[277px] h-[193px] bg-black border-[1.5px] border-gray5 flex flex-col justify-center m-auto">
      {banner ? (
        <Image
          src={banner}
          width={275}
          height={43}
          objectFit="cover"
          alt={title}
        />
      ) : null}

      <p className="px-4 mt-6 text-xl font-bold">{title}</p>

      <p className="font-bold text-xs text-gray3 mb-[30px] px-4">{email}</p>

      <div className="flex px-4 mb-6">
        <div className="flex mr-2">
          <Image
            src="/images/cbg-icon.svg"
            width={24}
            height={21}
            alt="cbg icon"
          />
        </div>

        <p className="font-bold">50 CBG</p>
      </div>
    </div>
  );
}
