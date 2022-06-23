interface CheckmarkIconProps {
  size: number;
}

export default function CheckmarkIcon(props: CheckmarkIconProps): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      fill="none"
      viewBox="0 0 22 23"
    >
      <path
        fill="#6CB14B"
        d="M22 11.968c0 6.075-4.925 11-11 11s-11-4.925-11-11 4.925-11 11-11 11 4.925 11 11zM9.728 17.792l8.16-8.161a.71.71 0 000-1.004l-1.003-1.003a.71.71 0 00-1.003 0L9.226 14.28l-3.108-3.108a.71.71 0 00-1.003 0L4.11 12.176a.71.71 0 000 1.003l4.613 4.613a.71.71 0 001.004 0z"
      />
    </svg>
  );
}
