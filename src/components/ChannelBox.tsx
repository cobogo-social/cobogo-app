import Image from 'next/image';

interface ChannelBoxProps {
  banner: string;
  title: string;
  email: string;
}

export default function ChannelBox({ banner, title, email }: ChannelBoxProps) {
  return (
    <div className="w-[277px] max-h-[193px] bg-black border-[1.5px] border-details px-4 mx-[15px]">
      {banner ? (
        <Image
          src={banner}
          width={275}
          height={43}
          objectFit="cover"
          alt={title}
        />
      ) : null}

      <p className="mt-6 text-xl font-bold">{title}</p>

      <p className="font-bold text-gray3 mb-[30px]">{email}</p>

      <div className="flex mb-6">
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
