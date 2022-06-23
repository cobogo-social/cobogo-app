interface LocationIconProps {
  size: number;
}

export default function LocationIcon(props: LocationIconProps): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      fill="none"
      viewBox="0 0 22 32"
    >
      <path
        fill="#fff"
        d="M11 .013c-6.081 0-11 4.946-11 11.06 0 8.297 11 20.543 11 20.543S22 19.37 22 11.074C22 4.959 17.081.013 11 .013zm0 15.011c-2.169 0-3.929-1.77-3.929-3.95s1.76-3.95 3.929-3.95c2.169 0 3.929 1.77 3.929 3.95s-1.76 3.95-3.929 3.95z"
      />
    </svg>
  );
}
