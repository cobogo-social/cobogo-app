import Image from 'next/image';

interface MobileTopBarProps {
  setOpen?: () => void;
}

export default function MobileTopBar({ setOpen }: MobileTopBarProps) {
  return (
    <div className="bg-secondary z-10 p-4 w-screen h-[52px] flex justify-between items-center fixed sm:hidden shadow-[0_0px_10px_15px_rgba(0,0,0,0.3)]">
      <div className="flex">
        <div className="flex mr-4" onClick={setOpen}>
          <Image src="/images/back-icon.svg" width={28} height={28} />
        </div>

        <Image
          src="/images/logo.svg"
          width={100}
          height={22}
          alt="cobogo logo"
        />
      </div>

      <div className="bg-white w-[9px] h-[9px] rounded-full"></div>
    </div>
  );
}
