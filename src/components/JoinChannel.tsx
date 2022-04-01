import Image from 'next/image';

export default function JoinChannel() {
  return (
    <a
      href="https://t.me/cobogosocial"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="bg-blue sm:w-[262px] h-[70px] mb-8 flex justify-start items-center px-6 hover:brightness-90">
        <span className="mr-6">
          <Image src="/images/telegram-icon.svg" width={35} height={30} />
        </span>

        <span className="flex flex-col">
          <p className="font-bold text-white text-xl">join channel</p>
          <p className="text-white">Telegram</p>
        </span>
      </span>
    </a>
  );
}
