import Image from 'next/image';

export default function ChannelsFilterSelect() {
  return (
    <div className="flex">
      <div className="w-[48px] h-[48px] border-[1.5px] bg-gray7 border-r-0 border-gray10 flex justify-center items-center">
        <Image
          src="/images/filter-icon.svg"
          width={18}
          height={18}
          alt="search icon"
        />
      </div>

      <select className="w-[262px] sm:w-[223px] h-[48px] bg-gray7 border-[1.5px] border-l-0 border-gray10 mb-8 px-2 outline-none hover:cursor-pointer shadow-[0_0px_4px_4px_rgba(0,0,0,0.25)]">
        <option value="most staked">most viewed</option>
        <option value="most staked">most recent</option>
        <option value="most staked">most staked</option>
      </select>
    </div>
  );
}
