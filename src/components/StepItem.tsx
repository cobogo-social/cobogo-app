import { useRouter } from 'next/router';

interface StepItemProps {
  number: string;
  text: string;
  href: string;
}

export default function StepItem({ number, text, href }: StepItemProps) {
  const { asPath } = useRouter();

  const selected = asPath === href ? 'border-blue' : 'border-details';

  return (
    <div className="flex items-center mb-[20px]">
      <div
        className={`border-[9px] ${selected} w-[47px] h-[41px] flex items-center justify-center mr-[13px] text-xl font-bold`}
      >
        {number}
      </div>

      <p className="font-bold">{text}</p>
    </div>
  );
}
