import Image from 'next/image';

interface ButtonProps {
  text: string;
  color: string;
  hoverColor?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  onClick?: (event: unknown) => void;
  onKeyDown?: (event: unknown) => void;
  borderColor?: string;
  borderSize?: string;
  textColor?: string;
  icon?: string;
}

export default function Button({
  text,
  color,
  hoverColor,
  width,
  height,
  fontSize,
  onClick,
  onKeyDown,
  borderColor,
  borderSize,
  textColor,
  icon,
}: ButtonProps) {
  return (
    // TODO: remove hoverColor on props
    <button
      className={`${width} ${
        height || 'h-[38px]'
      } ${color} hover:${hoverColor} font-bold ${fontSize} ${textColor} ${borderColor} ${borderSize} flex justify-center items-center px-[20px] hover:brightness-90`}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {text}{' '}
      {icon && (
        <div className="flex ml-1">
          <Image src={icon} width={15} height={15} alt="button icon" />
        </div>
      )}
    </button>
  );
}
