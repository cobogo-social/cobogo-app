import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="w-full h-[70px] bg-primary flex justify-between items-center px-8 col-span-2">
      <div className="flex">
        <Link href="mailto:hi@cobogo.social">
          <a className="mr-8" target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/mail-icon.svg"
              width={22}
              height={17}
              alt="main icon"
            />
          </a>
        </Link>
        <Link href="https://t.me/cobogosocial">
          <a className="mr-8" target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/telegram-icon.svg"
              width={21}
              height={19}
              alt="telegram icon"
            />
          </a>
        </Link>
        <Link href="https://twitter.com/cobogosocial">
          <a className="mr-8" target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/twitter-icon.svg"
              width={24}
              height={19}
              alt="twitter icon"
            />
          </a>
        </Link>
        <Link href="https://github.com/cobogo-social">
          <a target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/github-icon.svg"
              width={22}
              height={18}
              alt="github icon"
            />
          </a>
        </Link>
      </div>
      <div className="flex">
        <p className="text-white font-bold mr-8">FAQ</p>
        <p className="text-white font-bold mr-8">Code of conduct</p>
        <p className="text-white font-bold mr-8">Privacy policy</p>
        <p className="text-white font-bold">Terms of use</p>
      </div>
    </div>
  );
}
