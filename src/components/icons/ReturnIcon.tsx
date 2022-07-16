interface ReturnIconProps {
  size: number;
}

export default function ReturnIcon(props: ReturnIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height="21"
      fill="none"
      viewBox="0 0 12 21"
      className="hover:cursor-pointer"
    >
      <path
        fill="#00B9E9"
        d="M10.499 20.4c-.384 0-.768-.142-1.06-.427l-9-8.743a1.427 1.427 0 010-2.06l9-8.743a1.53 1.53 0 012.12 0c.587.57.587 1.491 0 2.06L3.622 10.2l7.94 7.714c.585.569.585 1.491 0 2.06a1.518 1.518 0 01-1.062.426z"
      />
    </svg>
  );
}
