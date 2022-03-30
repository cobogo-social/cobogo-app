import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

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
  const { push } = useRouter();

  function tryAnotherChannel() {
    signOut();
    push('/submit/connect');
  }

  return (
    <div
      className={`w-[275px] max-h-[400px] bg-black border-[1.5px] border-details pb-6 hidden sm:block`}
    >
      {banner ? (
        <Image
          src={banner}
          width={275}
          height={43}
          objectFit="cover"
          alt={title}
        />
      ) : null}

      <p className="font-bold text-white text-xl px-4 mt-6">{title}</p>

      <p className="text-white px-4">{description.slice(0, 210)}(...)</p>

      <a
        onClick={tryAnotherChannel}
        className="text-blue font-bold px-4 hover:cursor-pointer"
      >
        try another account
      </a>
    </div>
  );
}
