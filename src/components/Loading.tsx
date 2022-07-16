import { LoadingContext } from '@contexts/LoadingContext';
import Image from 'next/image';
import { useContext } from 'react';

export default function Loading() {
  const { loading } = useContext(LoadingContext);

  return loading ? (
    <div className="w-screen h-screen fixed top-0 right-0 z-50 flex justify-center items-center bg-black/[0.5]">
      <Image
        className="animate-spin"
        src="/favicon.ico"
        width={40}
        height={40}
        alt="load image"
      />
    </div>
  ) : null;
}
