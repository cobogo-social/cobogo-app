import Image from 'next/image';
import { useEffect } from 'react';

interface ServiceModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  name: string;
  description: string;
}

export default function ServiceModal({
  isOpen,
  setIsOpen,
  name,
  description,
}: ServiceModalProps) {
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
      <div className="relative bg-primary w-full sm:w-[598px] h-full sm:h-auto flex flex-col border-[1px] border-gray10 p-[40px] sm:p-[70px] shadow-[0_0px_4px_10px_rgba(0,0,0,0.4)]">
        <div className="flex flex-col items-start justify-center">
          <div
            onClick={closeModal}
            className="absolute top-10 sm:top-0 right-0 mt-[20px] mr-[20px] hover:cursor-pointer"
          >
            <Image
              src="/images/x2-icon.svg"
              width={13}
              height={13}
              alt="x2 icon"
            />
          </div>

          <p className="text-white text-[40px] mb-4">{name}</p>

          <div className="bg-blue w-full h-[272px] mb-4" />

          <p>{description}</p>
        </div>
      </div>
    </div>
  ) : null;
}
