import Loading from '@components/others/Loading';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface ChannelBoxProps {
  banner: string;
  title: string;
  description: string;
}

export default function ChannelBox({
  banner,
  title,
  description,
}: ChannelBoxProps) {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  function handleTryAnotherChannel() {
    setIsLoading(true);
    signOut();
    push('/submit/connect');
  }

  return (
    <>
      <Loading isLoading={isLoading} />

      <div className="w-[275px] max-h-[400px] bg-black border-[1.5px] border-gray5 pb-6 hidden sm:block">
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

        <p className="px-4">{description.slice(0, 210)}(...)</p>

        <button
          onClick={handleTryAnotherChannel}
          className="px-4 font-bold text-blue hover:cursor-pointer"
        >
          try another account
        </button>
      </div>
    </>
  );
}