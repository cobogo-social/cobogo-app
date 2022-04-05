import { useRouter } from 'next/router';

interface StepItemProps {
  number: string;
  text: string;
  href: string;
  open?: boolean;
}

export default function MobileStepItem({
  number,
  text,
  href,
  open,
}: StepItemProps) {
  const { asPath } = useRouter();

  const selected = asPath === href ? 'border-blue' : 'border-details';

  return (
    <div className="flex items-center text-white mb-[13px]">
      <div
        className={`border-[6px] ${selected} w-[31px] h-[28px] flex items-center justify-center ${
          open ? 'mr-[20px]' : 'mr-0'
        } text-xs font-bold`}
      >
        {number}
      </div>

      {open ? <p className="font-bold">{text}</p> : null}
    </div>
  );
}
