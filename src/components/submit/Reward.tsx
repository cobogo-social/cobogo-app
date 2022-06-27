import Image from 'next/image';

interface RewardProps {
  image: string;
  description: JSX.Element | string;
  link?: string;
  linkText?: string;
  done?: boolean;
}

export default function Reward(props: RewardProps) {
  return (
    <div className="flex gap-5">
      <Image src={props.image} width={88} height={77} alt="reward image" />

      <div className="flex flex-col justify-center">
        <p
          className={`text-lg font-bold max-w-[347px] ${
            props.linkText === 'coming soon...' ? 'text-gray9' : ''
          }`}
        >
          {props.description}
        </p>

        {props.done ? (
          <p className="font-bold text-green">done</p>
        ) : (
          <a
            target="_blank"
            href={props.link}
            className={`font-bold text-blue ${
              props.linkText === 'coming soon...' ? 'text-gray9' : ''
            }`}
            rel="noreferrer"
          >
            {props.linkText}
          </a>
        )}
      </div>
    </div>
  );
}
