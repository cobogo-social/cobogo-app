import Image from 'next/image';

export default function StakeERC721Input() {
  return (
    <div className="flex">
      <input
        className="w-[200px] h-[48px] bg-gray7 border border-r-0 border-gray10 p-2 outline-none"
        type="text"
      />

      <div className="w-[48px] h-[48px] border bg-gray7 border-l-0 border-gray10 flex justify-center items-center">
        <Image
          src="/images/open-icon.svg"
          width={13}
          height={7}
          alt="open icon"
        />
      </div>
    </div>
  );
}
