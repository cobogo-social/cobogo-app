import Image from 'next/image';

export default function JoinChannel() {
  return (
    <a
      href="https://t.me/cobogosocial"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="bg-blue sm:w-[262px] h-[70px] mb-10 flex justify-start items-center px-6 hover:brightness-90">
        <span className="mr-6">
          <Image
            src="/images/telegram-icon.svg"
            width={35}
            height={30}
            alt="telegram icon"
          />
        </span>

        <span className="flex flex-col">
          <p className="text-xl font-bold">join channel</p>
          <p>Telegram</p>
        </span>
      </span>
    </a>
  );
}
