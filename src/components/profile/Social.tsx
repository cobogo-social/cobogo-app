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
}

export default function Social(props: SocialProps) {
  return props.handle ? (
    <div
      onClick={props.onClick}
      className="flex w-[306px] hover:cursor-pointer"
    >
      <div className="mr-[27px] flex">{props.icon}</div>

      <div className="flex flex-col">
        <p className="font-bold text-[45px] leading-[25px] mb-[10px]">
          {String(props.number).length > 3
            ? numeral(Number(props.number)).format('0.0a').toUpperCase()
            : props.number}
        </p>
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
  ) : null;
}
