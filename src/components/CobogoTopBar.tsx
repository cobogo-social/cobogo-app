import Image from 'next/image';

export default function CobogoTopBar() {
  return (
    <div className="hidden sm:flex w-full justify-start items-center mb-[70px]">
      <Image src="/images/logo.svg" width={120} height={27} />
    </div>
  );
}
