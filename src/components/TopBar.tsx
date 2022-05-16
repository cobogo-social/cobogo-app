import Link from './Link';

export default function TopBar() {
  return (
    <div className="hidden sm:flex w-full justify-end items-center mb-[70px]">
      <Link href="/">
        <button className="font-bold">back to home</button>
      </Link>
    </div>
  );
}
