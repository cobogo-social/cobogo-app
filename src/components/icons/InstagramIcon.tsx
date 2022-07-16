import { useState } from 'react';

interface InstagramIconProps {
  size: number;
  color?: string;
}

export default function InstagramIcon(props: InstagramIconProps) {
  const [hover, setHover] = useState(false);

  return props.color ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      fill="none"
      viewBox="0 0 57 57"
    >
      <path
        fill={props.color}
        d="M28.017 13.647a14.339 14.339 0 00-14.36 14.363c0 7.95 6.411 14.363 14.36 14.363 7.948 0 14.36-6.412 14.36-14.363 0-7.95-6.412-14.363-14.36-14.363zm0 23.701c-5.137 0-9.336-4.188-9.336-9.338 0-5.15 4.186-9.338 9.336-9.338 5.149 0 9.335 4.188 9.335 9.338 0 5.15-4.199 9.338-9.335 9.338zM46.313 13.06c0 1.862-1.5 3.35-3.35 3.35-1.861 0-3.349-1.5-3.349-3.35a3.35 3.35 0 116.7 0zm9.51 3.4c-.212-4.488-1.236-8.463-4.523-11.738C48.025 1.447 44.05.422 39.564.197c-4.624-.263-18.484-.263-23.108 0C11.982.409 8.008 1.434 4.721 4.71 1.434 7.985.421 11.96.197 16.447c-.263 4.626-.263 18.489 0 23.114.212 4.487 1.237 8.462 4.524 11.738 3.287 3.275 7.249 4.3 11.735 4.525 4.624.262 18.484.262 23.108 0 4.487-.213 8.461-1.238 11.736-4.525 3.274-3.276 4.299-7.25 4.524-11.738.262-4.625.262-18.476 0-23.101zM49.85 44.523c-.975 2.45-2.862 4.338-5.324 5.326-3.687 1.462-12.435 1.125-16.51 1.125-4.074 0-12.834.325-16.509-1.125-2.45-.975-4.336-2.863-5.324-5.326-1.462-3.687-1.125-12.438-1.125-16.513 0-4.075-.325-12.838 1.125-16.513.975-2.45 2.862-4.337 5.324-5.325 3.687-1.462 12.435-1.125 16.51-1.125 4.074 0 12.835-.325 16.509 1.125 2.45.975 4.337 2.863 5.324 5.325 1.462 3.688 1.125 12.438 1.125 16.513 0 4.076.337 12.838-1.125 16.513z"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      fill="none"
      viewBox="0 0 57 57"
      onMouseOut={() => setHover(false)}
      onMouseOver={() => setHover(true)}
    >
      <path
        className="transition-colors"
        fill={hover ? '#E1306C' : '#FFF'}
        d="M28.017 13.647a14.339 14.339 0 00-14.36 14.363c0 7.95 6.411 14.363 14.36 14.363 7.948 0 14.36-6.412 14.36-14.363 0-7.95-6.412-14.363-14.36-14.363zm0 23.701c-5.137 0-9.336-4.188-9.336-9.338 0-5.15 4.186-9.338 9.336-9.338 5.149 0 9.335 4.188 9.335 9.338 0 5.15-4.199 9.338-9.335 9.338zM46.313 13.06c0 1.862-1.5 3.35-3.35 3.35-1.861 0-3.349-1.5-3.349-3.35a3.35 3.35 0 116.7 0zm9.51 3.4c-.212-4.488-1.236-8.463-4.523-11.738C48.025 1.447 44.05.422 39.564.197c-4.624-.263-18.484-.263-23.108 0C11.982.409 8.008 1.434 4.721 4.71 1.434 7.985.421 11.96.197 16.447c-.263 4.626-.263 18.489 0 23.114.212 4.487 1.237 8.462 4.524 11.738 3.287 3.275 7.249 4.3 11.735 4.525 4.624.262 18.484.262 23.108 0 4.487-.213 8.461-1.238 11.736-4.525 3.274-3.276 4.299-7.25 4.524-11.738.262-4.625.262-18.476 0-23.101zM49.85 44.523c-.975 2.45-2.862 4.338-5.324 5.326-3.687 1.462-12.435 1.125-16.51 1.125-4.074 0-12.834.325-16.509-1.125-2.45-.975-4.336-2.863-5.324-5.326-1.462-3.687-1.125-12.438-1.125-16.513 0-4.075-.325-12.838 1.125-16.513.975-2.45 2.862-4.337 5.324-5.325 3.687-1.462 12.435-1.125 16.51-1.125 4.074 0 12.835-.325 16.509 1.125 2.45.975 4.337 2.863 5.324 5.325 1.462 3.688 1.125 12.438 1.125 16.513 0 4.076.337 12.838-1.125 16.513z"
      />
    </svg>
  );
}
