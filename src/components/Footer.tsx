import getWindowAndDocumentHeight from '@utils/getWindowAndDocumentHeight';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [haveScroll, setHaveScroll] = useState<boolean>();

  useEffect(() => {
    const { documentHeight, windowHeight } = getWindowAndDocumentHeight();

    if (documentHeight > windowHeight) {
      setHaveScroll(true);
    } else {
      setHaveScroll(false);
    }
  }, []);

  return haveScroll ? (
    <div className="items-center justify-between hidden w-full h-[70px] col-span-2 pl-8 bg-black sm:flex">
      <div className="flex items-center justify-center h-full">
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

      <div className="flex items-center justify-center h-full">
        <a
          href="https://cobogo.social/faq"
          className="mr-8 font-bold"
          target="_blank"
          rel="noopener noreferrer"
        >
          FAQ
        </a>

        <a
          href="https://cobogo.social/code"
          className="mr-8 font-bold"
          target="_blank"
          rel="noopener noreferrer"
        >
          code of conduct
        </a>

        <a
          href="https://cobogo.social/privacy"
          className="mr-8 font-bold"
          target="_blank"
          rel="noopener noreferrer"
        >
          privacy policy
        </a>

        <a
          href="https://cobogo.social/terms"
          className="mr-8 font-bold"
          target="_blank"
          rel="noopener noreferrer"
        >
          terms of use
        </a>

        <a
          href="https://docs.cobogo.social/overview/what-is-cobogo"
          className="flex justify-center items-center h-full bg-gray4 w-[148px]"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="flex items-center justify-center mr-3">
            <Image
              src="/images/gitbook-icon.svg"
              width={30}
              height={21}
              alt="gitbook icon"
            />
          </span>

          <span className="font-bold">docs</span>
        </a>
      </div>
    </div>
  ) : (
    <div className="bg-black w-full h-[70px] justify-between items-center pl-8 col-span-2 hidden sm:flex absolute bottom-0">
      <div className="flex items-center justify-center h-full">
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
            alt="mail icon"
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
          className="flex mr-8"
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

        <a
          href="https://discord.gg/FWh7cqUkDt"
          className="flex"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/discord-icon.svg"
            width={27}
            height={27}
            alt="discord icon"
          />
        </a>
      </div>

      <div className="flex items-center justify-center h-full">
        <a
          href="https://cobogo.social/faq"
          className="mr-8 font-bold"
          target="_blank"
          rel="noopener noreferrer"
        >
          FAQ
        </a>

        <a
          href="https://cobogo.social/code"
          className="mr-8 font-bold"
          target="_blank"
          rel="noopener noreferrer"
        >
          code of conduct
        </a>

        <a
          href="https://cobogo.social/privacy"
          className="mr-8 font-bold"
          target="_blank"
          rel="noopener noreferrer"
        >
          privacy policy
        </a>

        <a
          href="https://cobogo.social/terms"
          className="mr-8 font-bold"
          target="_blank"
          rel="noopener noreferrer"
        >
          terms of use
        </a>

        <a
          href="https://docs.cobogo.social"
          className="flex justify-center items-center h-full bg-secondary w-[148px]"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="flex items-center justify-center mr-3">
            <Image
              src="/images/gitbook-icon.svg"
              width={30}
              height={21}
              alt="gitbook icon"
            />
          </span>

          <span className="font-bold">docs</span>
        </a>
      </div>
    </div>
  );
}
