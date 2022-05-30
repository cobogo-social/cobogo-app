import Image from 'next/image';

export default function ProfileMediaKitLinks() {
  return (
    <div className="w-[296px] h-[275px] px-[30px] py-[35px] flex flex-col justify-center border-[1px] border-gray10">
      <div className="flex mb-[30px]">
        <div className="flex mr-[10px]">
          <Image
            src="/images/discord-icon.svg"
            width={40}
            height={40}
            alt="discord icon"
          />
        </div>

        <div className="flex flex-col">
          <p className="font-bold text-[24px]">0</p>

          <button className="font-bold text-[14px] text-blue flex">
            join my Discord
          </button>
        </div>
      </div>

      <div className="flex mb-[30px]">
        <div className="flex mr-[10px]">
          <Image
            src="/images/telegram-icon.svg"
            width={40}
            height={40}
            alt="telegram icon"
          />
        </div>

        <div className="flex flex-col">
          <p className="font-bold text-[24px]">0</p>

          <button className="font-bold text-[14px] text-blue flex">
            join my Telegram
          </button>
        </div>
      </div>

      <div className="flex">
        <div className="flex mr-[10px]">
          <Image
            src="/images/twitter-icon.svg"
            width={40}
            height={40}
            alt="twitter icon"
          />
        </div>

        <div className="flex flex-col">
          <p className="font-bold text-[24px]">0</p>

          <button className="font-bold text-[14px] text-blue flex">
            follow me on Twitter
          </button>
        </div>
      </div>
    </div>
  );
}
