import Image from 'next/image';

interface SuccessBulletProps {
  text: string;
  link?: string;
}

export default function SuccessBullet({ text, link }: SuccessBulletProps) {
  return (
    <div className="flex items-center">
      <div className="flex mr-2">
        <Image
          src="/images/success-icon.svg"
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
