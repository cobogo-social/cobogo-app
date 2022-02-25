interface ButtonProps {
  text: string;
  color: string;
  hoverColor: string;
  width: string;
  height: string;
  fontSize?: string;
  onClick?: (event: any) => void;
  onKeyDown?: (event: any) => void;
  disabled?: boolean;
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
  disabled,
}: ButtonProps) {
  return (
    <button
      className={`${width} ${height} ${disabled ? 'bg-details' : color} hover:${
        disabled ? '' : hoverColor
      } font-bold ${fontSize} ${disabled ? 'text-secondary' : 'text-white'}`}
      disabled={disabled}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {text}
    </button>
  );
}
