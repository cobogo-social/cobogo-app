import { useRouter } from 'next/router';

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
    <>
      <div className="hidden sm:flex items-center mb-[20px]">
        <div
          className={`border-[9px] ${selected} w-[47px] h-[41px] flex items-center justify-center mr-[13px] text-xl font-bold`}
        >
          {number}
        </div>

        <p className="font-bold">{text}</p>
      </div>

      <div className="flex sm:hidden items-center mb-[13px]">
        <div
          className={`border-[6px] ${selected} w-[31px] h-[28px] flex items-center justify-center ${
            open ? 'mr-[20px]' : 'mr-0'
          } text-xs font-bold`}
        >
          {number}
        </div>

        {open ? <p className="font-bold">{text}</p> : null}
      </div>
    </>
  );
}
