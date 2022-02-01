import Link from 'next/link';
import { useRouter } from 'next/router';

interface StepItemProps {
  number: string;
  text: string;
  last?: boolean;
  href: string;
}

export default function StepItem({ number, text, last, href }: StepItemProps) {
  const { asPath } = useRouter();

  const selected = asPath === href ? 'border-blue' : 'border-details';

  return !last ? (
    <Link href={href}>
      <a>
        <div className="flex items-center text-white mb-6">
          <div
            className={`border-8 ${selected} w-12 h-10 flex items-center justify-center mr-6 text-xl font-bold`}
          >
            {number}
          </div>
          <p className="font-bold">{text}</p>
        </div>
      </a>
    </Link>
  ) : (
    <Link href={href}>
      <a>
        <div className="flex items-center text-white">
          <div className="border-8 border-details w-12 h-10 flex items-center justify-center mr-6 text-xl font-bold">
            {number}
          </div>
          <p className="font-bold">{text}</p>
        </div>
      </a>
    </Link>
  );
}
