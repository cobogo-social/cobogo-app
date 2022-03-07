import { useRouter } from 'next/router';

interface StepItemProps {
  number: string;
  text: string;
  href: string;
  open?: boolean;
  last?: boolean;
}

export default function MobileStepItem({
  number,
  text,
  href,
  open,
  last,
}: StepItemProps) {
  const { asPath } = useRouter();

  const selected = asPath === href ? 'border-blue' : 'border-details';

  return last ? (
    <div className="flex items-center text-white mb-6">
      <div
        className={`border-4 sm:border-8 ${selected} w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center ${
          open ? 'mr-4' : 'mr-0'
        } sm:mr-6 text-xs sm:text-xl font-bold`}
      >
        {number}
      </div>

      {open ? (
        <p className="font-bold text-xs sm:text-base text-green">{text}</p>
      ) : null}
    </div>
  ) : (
    <div className="flex items-center text-white mb-6">
      <div
        className={`border-4 sm:border-8 ${selected} w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center ${
          open ? 'mr-4' : 'mr-0'
        } sm:mr-6 text-xs sm:text-xl font-bold`}
      >
        {number}
      </div>

      {open ? <p className="font-bold text-xs sm:text-base">{text}</p> : null}
    </div>
  );
}
