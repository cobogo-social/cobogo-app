interface ButtonProps {
  text: string;
  color: string;
  hoverColor: string;
  width: string;
  height: string;
  fontSize: string;
}

export default function Button({
  text,
  color,
  hoverColor,
  width,
  height,
  fontSize,
}: ButtonProps) {
  return (
    <button
      className={`${width} ${height} ${color} hover:${hoverColor} font-bold ${fontSize} text-white`}
    >
      {text}
    </button>
  );
}
