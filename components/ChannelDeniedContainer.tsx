import Link from 'next/link';
import Button from './Button';

export default function ChannelDeniedContainer() {
  return (
    <div className="flex flex-col">
      <p className="text-4xl text-red mb-4">channel denied</p>
      <p className="text-xl text-white w-[408px] mb-12">
        unfortunately the channel has been denied...
      </p>

      <Link href="/submit/connect">
        <a className="font-bold text-blue mb-2">try another account</a>
      </Link>
      <Link href="">
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-blue"
        >
          visite our FAQ
        </a>
      </Link>
    </div>
  );
}
