import Image from 'next/image';

export default function CobogoCreators() {
  return (
    <a
      href="https://t.me/cobogocreators"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="bg-blue sm:w-[270px] h-[70px] mb-8 flex justify-center items-center">
        <span className="mr-4">
          <Image src="/images/telegram-icon.svg" width={35} height={30} />
        </span>

        <span className="flex flex-col">
          <p className="font-bold text-white text-xl">cobogo Creators</p>
          <p className="text-white">join channel</p>
        </span>
      </span>
    </a>
  );
}
