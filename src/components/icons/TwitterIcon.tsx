import { useState } from 'react';

interface TwitterIconProps {
  size: number;
}

export default function TwitterIcon(props: TwitterIconProps) {
  const [hover, setHover] = useState(false);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      fill="none"
      viewBox="0 0 24 19"
      onMouseOut={() => setHover(false)}
      onMouseOver={() => setHover(true)}
    >
      <path
        fill={hover ? '#1DA1F2' : '#FFF'}
        d="M21.533 4.735c.015.208.015.416.015.624C21.548 11.697 16.6 19 7.553 19 4.766 19 2.178 18.213 0 16.848c.396.044.777.059 1.188.059 2.3 0 4.416-.757 6.106-2.048-2.162-.045-3.974-1.425-4.599-3.325.305.044.61.074.93.074.441 0 .883-.06 1.294-.164C2.665 11 .975 9.07.975 6.74v-.06a5.051 5.051 0 002.223.61c-1.325-.862-2.193-2.331-2.193-3.994 0-.89.244-1.707.67-2.42 2.421 2.91 6.061 4.81 10.142 5.018a5.283 5.283 0 01-.122-1.098c0-2.643 2.193-4.795 4.92-4.795 1.415 0 2.695.579 3.593 1.514A9.838 9.838 0 0023.33.356a4.806 4.806 0 01-2.162 2.642c.99-.103 1.949-.37 2.832-.742-.67.95-1.508 1.796-2.467 2.48z"
      />
    </svg>
  );
}
