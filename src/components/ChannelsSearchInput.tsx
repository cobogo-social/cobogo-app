import Image from 'next/image';

export default function ChannelsSearchInput() {
  return (
    <div className="flex">
      <div className="w-[48px] h-[48px] border-[1.5px] bg-black border-r-0 border-gray5 flex justify-center items-center">
        <Image
          src="/images/search-icon.svg"
          width={19}
          height={19}
          alt="search icon"
        />
      </div>

      <input
        className="w-[418px] h-[48px] bg-black border-[1.5px] border-l-0 border-gray5 p-2 outline-none"
        type="text"
        placeholder="search by category or channel"
      />
    </div>
  );
}
