import Image from 'next/image';
import { useEffect } from 'react';

interface ErrorModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function ErrorModal({ isOpen, setIsOpen }: ErrorModalProps) {
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
      <div className="relative bg-primary w-[605px] h-[244px] flex flex-col justify-center items-center border-[1.5px] border-gray5 px-[70px]">
        <div className="flex flex-col items-start justify-center">
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

          <p className="text-red text-[40px]">error</p>

          <p className="text-[22px] max-w-[425px]">
            the server has encountered an unexpected error.
          </p>
        </div>
      </div>
    </div>
  ) : null;
}
