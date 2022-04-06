import Image from 'next/image';

interface ButtonWithIconProps {
  color: string;
  icon: string;
  text: string;
}

export default function ButtonWithIcon({
  color,
  icon,
  text,
}: ButtonWithIconProps) {
  return (
    <div className="h-[38px] flex hover:cursor-pointer">
      <div
        className={`${color} h-full flex justify-center items-center w-[52px]`}
      >
        <Image src={icon} width={25} height={21} alt={icon} />
      </div>

      <div className="h-[38px] w-[183px] text-white bg-gray flex justify-start items-center px-4">
        <p className="flex font-bold">{text}</p>
      </div>
    </div>
  );
}
