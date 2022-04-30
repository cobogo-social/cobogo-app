import Image from 'next/image';

interface WarningBulletProps {
  text: string;
  link?: string;
}

export default function WarningBullet({ text, link }: WarningBulletProps) {
  return (
    <div className="flex items-center">
      <div className="flex mr-2">
        <Image
          src="/images/error-icon.svg"
          width={27}
          height={27}
          alt="error icon"
        />
      </div>

      <p className="text-sm font-bold sm:text-base">
        {text} <span className="text-blue">{link}</span>
      </p>
    </div>
  );
}
