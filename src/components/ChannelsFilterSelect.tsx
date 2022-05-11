import Image from 'next/image';

export default function ChannelsFilterSelect() {
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

      <select className="w-[223px] h-[48px] bg-black border-[1.5px] border-l-0 border-gray5 mb-8 px-2 outline-none hover:cursor-pointer">
        <option value="most staked">most staked</option>
      </select>
    </div>
  );
}
