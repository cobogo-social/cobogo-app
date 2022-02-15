import Image from 'next/image';
import { signOut } from 'next-auth/react';

interface ChannelBannerProps {
  banner: string;
  title: string;
  description: string;
}

export default function ChannelBanner({
  banner,
  title,
  description,
}: ChannelBannerProps) {
  return (
    <div className="w-[275px] max-h-[296px] bg-black border-[1.5px] border-details pb-6">
      <Image
        src={banner}
        width={275}
        height={43}
        objectFit="cover"
        alt={title}
      />

      <p className="font-bold text-white text-xl px-4 mt-6">{title}</p>
      <p className="text-white px-4">{description.slice(0, 210)}(...)</p>
      <a
        onClick={() => signOut()}
        className="text-blue font-bold px-4 hover:cursor-pointer"
      >
        try another account
      </a>
    </div>
  );
}
