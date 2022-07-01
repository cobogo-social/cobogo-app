import { useState } from 'react';

interface TwitchIconProps {
  size: number;
  color?: string;
}

export default function TwitchIcon(props: TwitchIconProps) {
  const [hover, setHover] = useState(false);

  return props.color ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      fill="none"
      viewBox="0 0 55 59"
    >
      <path
        fill={props.color}
        d="M43.12 11.911h-4.54V24.54h4.54V11.911zm-12.48-.054H26.1v12.635h4.54V11.857zM11.346 0L0 10.524v37.893h13.614V58.94L24.96 48.417h9.08L54.465 29.47V0h-43.12zm38.58 27.37l-9.076 8.417H31.77l-7.945 7.368v-7.368h-10.21V4.211h36.31V27.37z"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      fill="none"
      viewBox="0 0 55 59"
      onMouseOut={() => setHover(false)}
      onMouseOver={() => setHover(true)}
    >
      <path
        className="transition-colors"
        fill={hover ? '#6441A5' : '#FFF'}
        d="M43.12 11.911h-4.54V24.54h4.54V11.911zm-12.48-.054H26.1v12.635h4.54V11.857zM11.346 0L0 10.524v37.893h13.614V58.94L24.96 48.417h9.08L54.465 29.47V0h-43.12zm38.58 27.37l-9.076 8.417H31.77l-7.945 7.368v-7.368h-10.21V4.211h36.31V27.37z"
      />
    </svg>
  );
}
