import React from 'react';

interface YouTubeIconProps {
  size: number;
}

export default function YouTubeIcon(props: YouTubeIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      fill="none"
      viewBox="0 0 28 20"
    >
      <path
        fill="#fff"
        d="M27.414 3.109A3.535 3.535 0 0024.938.594C22.755 0 14 0 14 0S5.244 0 3.06.594A3.535 3.535 0 00.585 3.11C0 5.327 0 9.955 0 9.955s0 4.628.585 6.846a3.482 3.482 0 002.475 2.475c2.184.594 10.94.594 10.94.594s8.755 0 10.938-.594a3.482 3.482 0 002.476-2.475c.585-2.218.585-6.846.585-6.846s0-4.628-.585-6.846zM11.136 14.157V5.753l7.318 4.202-7.318 4.202z"
      />
    </svg>
  );
}
