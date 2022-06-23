interface TelegramIconProps {
  size: number;
}

export default function TelegramIcon(props: TelegramIconProps): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      fill="none"
      viewBox="0 0 21 19"
    >
      <path
        fill="#fff"
        d="M20.94 1.73l-3.169 16.123c-.239 1.138-.862 1.421-1.748.885L11.194 14.9l-2.33 2.417c-.258.278-.473.51-.97.51l.347-5.305 8.949-8.724c.389-.374-.085-.581-.605-.207L5.522 11.106.759 9.498C-.277 9.149-.296 8.38.974 7.844L19.604.101c.863-.349 1.617.208 1.336 1.629z"
      />
    </svg>
  );
}
