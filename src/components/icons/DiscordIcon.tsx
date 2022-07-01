import { useState } from 'react';

interface DiscordIconProps {
  size: number;
}

export default function DiscordIcon(props: DiscordIconProps) {
  const [hover, setHover] = useState(false);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      fill={hover ? '#7289DA' : '#FFF'}
      viewBox="0 0 30 30"
      onMouseOut={() => setHover(false)}
      onMouseOver={() => setHover(true)}
    >
      <path d="M12.345 6.236c-.218-.606-.438-1.217-.442-1.225a.6.6 0 00-.604-.357c-.162.013-3.995.343-6.451 2.318C3.564 8.158 1 15.092 1 21.087a.6.6 0 00.08.301c1.771 3.11 6.599 3.924 7.699 3.959a.612.612 0 00.511-.249l1.19-1.612c-1.966-.299-2.321-.689-2.404-.75-.444-.327-.772-.785-.374-1.363.306-.449.948-.597 1.44-.344.504.235 1.853.991 5.858.971 3.977-.012 5.723-.845 5.748-.863.668-.301 1.189-.177 1.514.269.387.607.111 1.018-.331 1.344-.083.061-.284.232-2.396.732l1.175 1.615c.115.158.298.25.492.25l.019-.001c1.101-.035 5.929-.849 7.699-3.959a.6.6 0 00.08-.301c0-5.994-2.564-12.928-3.88-14.14-2.424-1.948-6.257-2.278-6.419-2.292a.608.608 0 00-.604.357c-.004.008-.218.629-.425 1.228 0 0-1.631-.239-2.672-.239s-2.655.236-2.655.236zM11 19c-1.105 0-2-1.333-2-2.979s.895-2.979 2-2.979c1.109-.165 1.976 1.333 2 2.979C13 17.667 12.105 19 11 19zm8 0c-1.105 0-2-1.342-2-2.997s.895-2.997 2-2.997 2 1.342 2 2.997S20.105 19 19 19z" />
    </svg>
  );
}
