interface CloseIconProps {
  size: number;
}

export default function CloseIcon(props: CloseIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      fill="none"
      viewBox="0 0 13 14"
    >
      <path
        fill="#666"
        d="M12.618 11.117c.508.488.508 1.28 0 1.768a1.315 1.315 0 01-.918.365 1.32 1.32 0 01-.919-.366L6.5 8.77l-4.28 4.113a1.315 1.315 0 01-.92.367c-.333 0-.665-.121-.92-.367a1.216 1.216 0 010-1.768l4.283-4.117L.38 2.883a1.216 1.216 0 010-1.768 1.337 1.337 0 011.838 0L6.5 5.235l4.282-4.118a1.337 1.337 0 011.838 0c.508.488.508 1.28 0 1.768L8.338 7.002l4.28 4.115z"
      />
    </svg>
  );
}
