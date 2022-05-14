import Image from 'next/image';

interface LoadingProps {
  isLoading: boolean;
}

export default function Loading({ isLoading }: LoadingProps) {
  // TODO: create a context with this Loading/Error and update all Loading's/Error's in the app to a hook
  return isLoading ? (
    <div className="w-screen h-screen fixed top-0 right-0 z-20 flex justify-center items-center bg-black/[0.5]">
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
