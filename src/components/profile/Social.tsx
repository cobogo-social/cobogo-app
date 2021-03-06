import CheckmarkIcon from '@components/icons/CheckmarkIcon';
import LinkIcon from '@components/icons/LinkIcon';
import numeral from 'numeral';

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
  isOwner: boolean;
  openEditMediaKitSocialSidebar: (socialName?: string) => void;
  hoverBorderColor: string;
  verified?: boolean;
}

export default function Social(props: SocialProps) {
  return props.handle ? (
    <div className="relative hover:cursor-pointer" onClick={props.onClick}>
      <div
        className={`h-full absolute flex justify-center items-center ${props.iconPosition}`}
      >
        <div className="bg-primary py-[10px]">{props.icon}</div>
      </div>

      <div
        className={`w-[310px] h-[207px] border border-gray10 ${props.hoverBorderColor} flex flex-col justify-center items-start px-10 transition-colors`}
      >
        <div className="flex flex-col justify-center items-start">
          <p className="font-bold mb-[20px] text-2xl gap-2 flex items-center">
            {props.name} {props.verified && <CheckmarkIcon size={18} />}
          </p>

          <strong className="text-5xl">
            {String(props.number).length > 3
              ? numeral(Number(props.number)).format('0.00a').toUpperCase()
              : props.number}
          </strong>

          <p className="font-bold text-gray6 mb-[20px]">{props.placeholder}</p>

          {props.link && (
            <a
              target="_blank"
              href={props.link}
              className="font-bold text-blue flex gap-1 items-center"
              rel="noreferrer"
            >
              {props.linkPlaceholder} <LinkIcon size={15} />
            </a>
          )}
        </div>
      </div>
    </div>
  ) : !props.handle && props.isOwner ? (
    <div className="relative">
      <div
        className={`h-full absolute flex justify-center items-center ${props.iconPosition}`}
      >
        <div className="bg-primary py-[10px]">{props.icon}</div>
      </div>

      <div className="w-[310px] h-[207px] border border-gray10 flex flex-col justify-center items-start px-10">
        <div className="flex flex-col justify-center items-start">
          <p className="font-bold text-2xl">{props.name}</p>

          <button
            className="font-bold text-blue flex gap-1 items-center"
            onClick={() =>
              props.openEditMediaKitSocialSidebar(props.name.toLowerCase())
            }
          >
            add +
          </button>
        </div>
      </div>
    </div>
  ) : null;
}
