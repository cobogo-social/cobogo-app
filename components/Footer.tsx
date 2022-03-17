import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="w-full h-[70px] bg-primary justify-between items-center pl-8 col-span-2 hidden sm:flex">
      <div className="flex justify-center items-center">
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
          <a className="mr-8" target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/github-icon.svg"
              width={22}
              height={18}
              alt="github icon"
            />
          </a>
        </Link>

        <Link href="https://medium.com/@cobogosocial">
          <a target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/medium-icon.svg"
              width={21}
              height={21}
              alt="medium icon"
            />
          </a>
        </Link>
      </div>

      <div className="flex justify-center items-center h-full">
        <a className="text-white font-bold mr-8">FAQ</a>

        <a className="text-white font-bold mr-8">code of conduct</a>

        <a className="text-white font-bold mr-8">privacy policy</a>

        <a className="text-white font-bold mr-8">terms of use</a>

        <Link href="https://docs.cobogo.social/overview/what-is-cobogo">
          <a className="flex justify-center items-center h-full bg-secondary w-[148px]">
            <div className="mr-3 flex justify-center items-center">
              <Image
                src="/images/gitbook-icon.svg"
                width={30}
                height={21}
                alt="gitbook icon"
              />
            </div>

            <a className="text-white font-bold">docs</a>
          </a>
        </Link>
      </div>
    </div>
  );
}
