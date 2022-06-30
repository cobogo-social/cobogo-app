interface DeleteIconProps {
  size: number;
  color?: 'red';
}

export default function DeleteIcon(props: DeleteIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      fill="none"
      viewBox="0 0 15 17"
    >
      <path
        fill={props.color === 'red' ? '#CE5E4A' : '#666'}
        d="M4.505.587c.18-.36.55-.587.953-.587h4.011c.403 0 .773.227.953.587l.24.476h3.199c.59 0 1.066.475 1.066 1.062 0 .587-.477 1.063-1.066 1.063H1.066A1.064 1.064 0 010 2.125c0-.587.477-1.063 1.066-1.063h3.199l.24-.475zm8.65 14.889A1.6 1.6 0 0111.557 17h-8.19a1.6 1.6 0 01-1.596-1.524L1.036 4.25h12.825l-.707 11.226z"
      />
    </svg>
  );
}
