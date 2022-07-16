interface AddIconProps {
  size: number;
}

export default function AddIcon(props: AddIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      fill="none"
      viewBox="0 0 24 24"
      className="hover:cursor-pointer"
    >
      <path
        fill="#00B9E9"
        d="M0 12C0 5.372 5.372 0 12 0s12 5.372 12 12-5.372 12-12 12S0 18.628 0 12zm12 5.25c.623 0 1.125-.502 1.125-1.125v-3h3c.623 0 1.125-.502 1.125-1.125s-.502-1.125-1.125-1.125h-3v-3c0-.623-.502-1.125-1.125-1.125s-1.125.502-1.125 1.125v3h-3c-.623 0-1.125.502-1.125 1.125s.502 1.125 1.125 1.125h3v3c0 .623.502 1.125 1.125 1.125z"
      />
    </svg>
  );
}
