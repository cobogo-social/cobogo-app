import Link from 'next/link';

export default function TopBar() {
  return (
    <div className="flex w-full justify-end mb-28">
      <Link href="/">
        <a>
          <p className="text-white font-bold mr-8">back to home</p>
        </a>
      </Link>
      <p className="text-white font-bold">connect to wallet</p>
    </div>
  );
}
