import Image from 'next/image';

export default function StakeERC721Input() {
  return (
    <div className="flex">
      <input
        className="w-[200px] h-[48px] bg-black border-[1.5px] border-r-0 border-gray5 p-2 outline-none"
        type="text"
      />

      <div className="w-[48px] h-[48px] border-[1.5px] bg-black border-l-0 border-gray5 flex justify-center items-center">
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
