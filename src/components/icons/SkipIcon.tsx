interface BackIconProps {
  size: number;
  disabled?: boolean;
}

export default function SkipIcon(props: BackIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      fill="none"
      viewBox="0 0 10 16"
    >
      <path
        fill={props.disabled ? '#666' : '#FFF'}
        d="M0 14.12L6.18 8 0 1.88 1.903 0 10 8l-8.097 8L0 14.12z"
      />
    </svg>
  );
}
