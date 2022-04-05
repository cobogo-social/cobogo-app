import Image from 'next/image';

export default function Footer() {
  return (
    <div className="bg-black w-full h-[7.5vh] justify-between items-center pl-8 col-span-2 hidden sm:flex">
      <div className="flex justify-center items-center h-full">
        <a
          href="mailto:hi@cobogo.social"
          className="flex mr-8"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/mail-icon.svg"
            width={22}
            height={17}
            alt="main icon"
          />
        </a>

        <a
          href="https://t.me/cobogosocial"
          className="flex mr-8"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/telegram-icon.svg"
            width={21}
            height={19}
            alt="telegram icon"
          />
        </a>

        <a
          href="https://twitter.com/cobogosocial"
          className="flex mr-8"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/twitter-icon.svg"
            width={24}
            height={19}
            alt="twitter icon"
          />
        </a>

        <a
          href="https://github.com/cobogo-social"
          className="flex mr-8"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/github-icon.svg"
            width={22}
            height={18}
            alt="github icon"
          />
        </a>

        <a
          href="https://medium.com/@cobogosocial"
          className="flex"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/medium-icon.svg"
            width={21}
            height={21}
            alt="medium icon"
          />
        </a>
      </div>

      <div className="flex justify-center items-center h-full">
        <a
          href="https://cobogo.social/faq"
          className="text-white font-bold mr-8"
          target="_blank"
          rel="noopener noreferrer"
        >
          FAQ
        </a>

        <a
          href="https://cobogo.social/code"
          className="text-white font-bold mr-8"
          target="_blank"
          rel="noopener noreferrer"
        >
          code of conduct
        </a>

        <a
          href="https://cobogo.social/privacy"
          className="text-white font-bold mr-8"
          target="_blank"
          rel="noopener noreferrer"
        >
          privacy policy
        </a>

        <a
          href="https://cobogo.social/terms"
          className="text-white font-bold mr-8"
          target="_blank"
          rel="noopener noreferrer"
        >
          terms of use
        </a>

        <a
          href="https://docs.cobogo.social/overview/what-is-cobogo"
          className="flex justify-center items-center h-full bg-secondary w-[148px]"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="mr-3 flex justify-center items-center">
            <Image
              src="/images/gitbook-icon.svg"
              width={30}
              height={21}
              alt="gitbook icon"
            />
          </span>

          <span className="text-white font-bold">docs</span>
        </a>
      </div>
    </div>
  );
}
