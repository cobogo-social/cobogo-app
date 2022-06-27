import React from 'react';

interface LinkIconProps {
  size: number;
}

export default function LinkIcon(props: LinkIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      fill="none"
      viewBox="0 0 15 15"
    >
      <path
        fill="#666"
        d="M12.656 9.375h-.937a.469.469 0 00-.469.469v3.281H1.875V3.75h4.219a.469.469 0 00.468-.469v-.937a.469.469 0 00-.468-.469H1.406A1.406 1.406 0 000 3.281v10.313A1.406 1.406 0 001.406 15H11.72a1.406 1.406 0 001.406-1.406v-3.75a.469.469 0 00-.469-.469zM14.296 0h-3.75a.705.705 0 00-.497 1.201l1.047 1.047-7.14 7.138a.703.703 0 000 .996l.663.663a.703.703 0 00.996 0l7.137-7.14L13.8 4.952c.44.44 1.201.132 1.201-.498V.703A.703.703 0 0014.297 0z"
      />
    </svg>
  );
}
