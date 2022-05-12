import Image from 'next/image';
import { useRouter } from 'next/router';

import Button from './Button';
import Link from './Link';

export default function MainTopBar() {
  const { asPath } = useRouter();

  return (
    <div className="h-[100px] w-full hidden sm:flex justify-between items-center px-[39px]">
      <Image src="/images/logo.svg" width={120} height={27} alt="logo" />

      <div className="flex items-center justify-center">
        {asPath !== '/' && (
          <Link href="/">
            <button className="font-bold mr-[40px]">back to home</button>
          </Link>
        )}

        <div className="mr-[40px]">
          <Link href="/submit">
            <Button
              text="submit a channel"
              color="bg-purple"
              hoverColor="brightness-90"
              width="w-[174px]"
              height="h-[38px]"
            />
          </Link>
        </div>

        <div className="flex items-center justify-center hover:cursor-pointer">
          {/* <div className="flex mr-[6px]">
            <Image
              src="/images/metamask-small-icon.svg"
              width={32}
              height={32}
              alt="metamask icon"
            />
          </div> */}

          <p className="font-bold">connect wallet</p>

          {/* <div className="w-[9px] h-[9px] ml-[10px] bg-green rounded-full" /> */}
        </div>
      </div>
    </div>
  );
}
