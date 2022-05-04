import Image from 'next/image';

export default function ChannelsFilter() {
  return (
    <div className="flex">
      <div className="w-[48px] h-[48px] border-[1.5px] bg-black border-r-0 border-gray5 flex justify-center items-center">
        <Image
          src="/images/filter-icon.svg"
          width={18}
          height={18}
          alt="search icon"
        />
      </div>

      <input
        className="w-[178px] h-[48px] bg-black border-[1.5px] border-x-0 border-gray5 p-2 outline-none"
        type="text"
        placeholder="most staked"
      />

      <div className="w-[48px] h-[48px] border-[1.5px] bg-black border-l-0 border-gray5 flex justify-center items-center">
        <Image
          src="/images/open-icon.svg"
          width={13}
          height={7}
          alt="search icon"
        />
      </div>
    </div>
  );
}
