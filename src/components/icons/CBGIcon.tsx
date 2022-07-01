interface CBGIconProps {
  size: number;
  color: string;
}

export default function CBGIcon(props: CBGIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      fill="none"
      viewBox="0 0 73 65"
    >
      <path
        fill={props.color}
        d="M0 64.848H15.193V137.84699999999998H0z"
        transform="rotate(-90 0 64.848)"
      />
      <path fill={props.color} d="M0 0.001H14.637V64.848H0z" />
      <path
        fill={props.color}
        d="M73 0.001H88.193V73H73z"
        transform="rotate(90 73 .001)"
      />
      <path
        fill={props.color}
        d="M73 64.848H87.637V129.695H73z"
        transform="rotate(-180 73 64.848)"
      />
    </svg>
  );
}
