import Image from 'next/image';

interface WarningBulletProps {
  text: string;
  link?: string;
  buttonText?: string;
  onClick?: () => void;
}

export default function WarningBullet(props: WarningBulletProps) {
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

      <div className="flex flex-col items-start">
        <p className="text-lg font-bold sm:text-base">
          {props.text} <span className="text-blue">{props.link}</span>
        </p>

        <button className="font-bold text-blue" onClick={props.onClick}>
          {props.buttonText}
        </button>
      </div>
    </div>
  );
}
