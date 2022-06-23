interface BackIconProps {
  size: number;
  disabled?: boolean;
}

export default function BackIcon(props: BackIconProps): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      fill="none"
      viewBox="0 0 10 16"
    >
      <path
        fill={props.disabled ? '#666' : '#FFF'}
        d="M10 1.88L3.82 8 10 14.12 8.097 16 0 8l8.097-8L10 1.88z"
      />
    </svg>
  );
}
