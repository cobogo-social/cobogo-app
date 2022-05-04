import Image from 'next/image';

import Button from './Button';

export default function MainTopBar() {
  return (
    <div className="h-[100px] w-full flex justify-between items-center px-[39px]">
      <Image src="/images/logo.svg" width={120} height={27} alt="logo" />

      <div className="flex items-center justify-center">
        <p className="font-bold mr-[40px] hover:cursor-pointer">back to home</p>

        <div className="mr-[40px]">
          <Button
            text="submit a channel"
            color="bg-purple"
            hoverColor="brightness-90"
            width="w-[174px]"
            height="h-[38px]"
          />
        </div>

        <div className="flex items-center justify-center hover:cursor-pointer">
          <div className="flex mr-[6px]">
            <Image
              src="/images/metamask-small-icon.svg"
              width={32}
              height={32}
              alt="metamask icon"
            />
          </div>

          <p className="font-bold mr-[10px]">wallet address</p>

          <div className="w-[9px] h-[9px] bg-green rounded-full" />
        </div>
      </div>
    </div>
  );
}
