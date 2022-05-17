import Image from 'next/image';
import { useEffect } from 'react';

interface TokenInfoModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function TokenInfoModal({
  isOpen,
  setIsOpen,
}: TokenInfoModalProps) {
  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('active-modal');
    } else {
      document.body.classList.remove('active-modal');
    }
  }, [isOpen]);

  return isOpen ? (
    <div className="w-screen h-screen fixed top-0 right-0 z-10 flex justify-center items-center bg-black/[0.5]">
      <div className="relative bg-primary w-[605px] h-[466px] flex flex-col justify-center items-center border-[1.5px] border-gray5 px-[70px] shadow-[0_0px_0px_10px_rgba(0,0,0,0.4)]">
        <div className="flex flex-col items-center justify-center">
          <div
            onClick={closeModal}
            className="absolute top-0 right-0 mt-[20px] mr-[20px] hover:cursor-pointer"
          >
            <Image
              src="/images/x2-icon.svg"
              width={13}
              height={13}
              alt="x2 icon"
            />
          </div>

          <div className="mb-[27px]">
            <Image
              src="/images/cbg-icon.svg"
              width={73}
              height={65}
              alt="cbg icon"
            />
          </div>

          <p className="text-[40px] mb-[18px]">CBG Token</p>

          <div className="flex flex-col items-start justify-center">
            <p className="text-[20px] mb-[29px]">
              CBG is the official token of cobogo. The token was not minted yet
              and is not listed on any exchange.
            </p>

            <p className="font-bold">initial supply: 100,000,000</p>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
