import Image from 'next/image';

interface ButtonProps {
  text: string;
  color?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  onClick?: (event: unknown) => void;
  onKeyDown?: (event: unknown) => void;
  borderColor?: string;
  borderSize?: string;
  textColor?: string;
  icon?: string;
  disabled?: boolean;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      disabled={props.disabled}
      className={`${props.width} ${props.height || 'h-[38px]'} ${
        props.color
      } font-bold ${props.fontSize} ${props.textColor} ${props.borderColor} ${
        props.borderSize
      } flex justify-center items-center px-[20px] hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-50`}
      onClick={props.onClick}
      onKeyDown={props.onKeyDown}
    >
      {props.text}{' '}
      {props.icon && (
        <div className="flex ml-1">
          <Image src={props.icon} width={15} height={15} alt="button icon" />
        </div>
      )}
    </button>
  );
}
