import Image from 'next/image';

export default function StakeSwapInput() {
  return (
    <div className="flex">
      <input
        className="w-[268px] h-[48px] bg-black border-[1.5px] border-r-0 border-gray5 p-2 outline-none"
        type="text"
        placeholder="0.0"
      />

      <div className="w-[164px] h-[48px] border-[1.5px] bg-secondary border-l-0 border-gray5 flex justify-center items-center">
        <p className="font-bold mr-[10px]">select a token</p>

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
