import LinkIcon from '@components/icons/LinkIcon';

interface SocialProps {
  onClick?: () => void;
  icon: JSX.Element;
  number: number;
  placeholder: string;
  link: string;
  linkPlaceholder: string;
  handle: string;
  iconPosition: string;
  name: string;
}

export default function Social(props: SocialProps) {
  return props.handle ? (
    <div className="relative hover:cursor-pointer" onClick={props.onClick}>
      <div
        className={`h-full absolute flex justify-center items-center ${props.iconPosition}`}
      >
        <div className="bg-primary py-[10px]">{props.icon}</div>
      </div>

      <div className="w-[310px] h-[207px] border border-gray10 flex flex-col justify-center items-start px-10">
        <div className="flex flex-col justify-center items-start">
          <p className="font-bold mb-[20px] text-2xl">{props.name}</p>

          <strong className="text-5xl">{props.number}</strong>

          <p className="font-bold text-gray6 mb-[20px]">{props.placeholder}</p>

          {props.link && (
            <a
              target="_blank"
              href={props.link}
              className="font-bold text-blue flex gap-[5px] items-center"
              rel="noreferrer"
            >
              {props.linkPlaceholder} <LinkIcon size={15} />
            </a>
          )}
        </div>
      </div>
    </div>
  ) : null;
}
