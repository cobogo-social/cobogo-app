import { useRouter } from 'next/router';

import Link from './Link';

interface StepItemProps {
  number: string;
  text: string;
  href: string;
  open?: boolean;
}

export default function StepItem({ number, text, href, open }: StepItemProps) {
  const { asPath } = useRouter();

  const selected = asPath === href ? 'border-blue' : 'border-gray5';

  return (
    <Link href={href}>
      <div className="flex items-center mb-[13px] sm:mb-[20px]">
        <div
          className={`border-[6px] sm:border-[9px] ${selected} w-[31px] sm:w-[47px] h-[28px] sm:h-[41px] flex items-center justify-center sm:mr-[13px] ${
            open ? 'mr-[20px]' : 'mr-0'
          } text-xs sm:text-xl font-bold`}
        >
          {number}
        </div>

        <p className="hidden sm:block font-bold">{text}</p>

        {open ? <p className="font-bold">{text}</p> : null}
      </div>
    </Link>
  );
}
