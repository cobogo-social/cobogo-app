import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { useEffect } from 'react';

interface ChannelBannerProps {
  id: string;
  title: string;
  description: string;
  image: string;
  statistics: {
    viewCount: string;
    subscriberCount: string;
    videoCount: string;
  };
}

export default function ChannelBanner(props) {
  return (
    <div className="w-[275px] h-[296px] bg-black border-[1.5px] border-details">
      <Image
        src={props.channelData.channelData.image}
        width={275}
        height={43}
        objectFit="cover"
        alt={props.channelData.channelData.title}
      />

      <p className="font-bold text-white text-xl px-4 mt-6">
        {props.channelData.channelData.title}
      </p>
      <p className="text-white px-4">
        {props.channelData.channelData.description}
      </p>
      <a
        onClick={() => signOut()}
        className="text-blue font-bold px-4 hover:cursor-pointer"
      >
        try another account
      </a>
    </div>
  );
}
