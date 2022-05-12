import Image from 'next/image';

interface ChannelsSearchInputProps {
  search: string;
  setSearch: (search: string) => void;
}

export default function ChannelsSearchInput({
  search,
  setSearch,
}: ChannelsSearchInputProps) {
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
        className="w-[262px] sm:w-[418px] h-[48px] bg-black border-[1.5px] border-l-0 border-gray5 p-2 outline-none"
        type="text"
        placeholder="search by channel name"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
    </div>
  );
}
