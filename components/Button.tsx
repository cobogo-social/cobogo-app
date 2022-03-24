interface ButtonProps {
  text: string;
  color: string;
  hoverColor: string;
  width: string;
  height: string;
  fontSize?: string;
  onClick?: (event: unknown) => void;
  onKeyDown?: (event: unknown) => void;
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
}: ButtonProps) {
  return (
    <button
      className={`${width} ${height} ${color} hover:${hoverColor} font-bold ${fontSize} text-white`}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {text}
    </button>
  );
}
