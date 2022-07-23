import Image from 'next/image';

interface ProfileImageProps {
  src: string;
}

export default function ProfileImage(props: ProfileImageProps) {
  return (
    <div className="w-24 h-24 sm:w-[140px] sm:h-[140px] bg-blue shadow-[0_0px_4px_4px_rgba(0,0,0,0.25)] relative">
      {props.src && (
        <Image
          src={props.src}
          objectFit="cover"
          layout="fill"
          alt="profile image"
        />
      )}
    </div>
  );
}
