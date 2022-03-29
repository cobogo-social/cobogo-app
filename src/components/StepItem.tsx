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
    <div className="flex items-center text-white mb-6">
      <div
        className={`border-4 sm:border-8 ${selected} w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center mr-4 sm:mr-6 text-xs sm:text-xl font-bold`}
      >
        {number}
      </div>

      <p className="font-bold text-xs sm:text-base">{text}</p>
    </div>
  );
}
