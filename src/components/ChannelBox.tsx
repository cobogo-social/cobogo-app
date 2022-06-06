import { LoadingContext } from '@contexts/LoadingContext';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext } from 'react';

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
  const { setLoading } = useContext(LoadingContext);

  function tryAnotherChannel() {
    setLoading(true);
    signOut();
    push('/submit/connect');
  }

  return (
    <div className="w-[275px] max-h-[400px] bg-black border-[1.5px] border-gray10 pb-6 hidden sm:block shadow-[0_0px_4px_4px_rgba(0,0,0,0.25)]">
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

      <p className="px-4">{description.slice(0, 210)} (...)</p>

      <button
        onClick={tryAnotherChannel}
        className="px-4 font-bold text-blue hover:cursor-pointer"
      >
        try another account
      </button>
    </div>
  );
}
