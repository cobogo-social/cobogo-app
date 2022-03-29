import Image from 'next/image';

interface ErrorModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function ErrorModal({ isOpen, setIsOpen }: ErrorModalProps) {
  function handleClose() {
    setIsOpen(false);
  }

  return isOpen ? (
    <div className="w-screen h-screen fixed top-0 right-0 z-10 flex justify-center items-center bg-black/[0.5]">
      <div className="bg-secondary w-[240px] flex flex-col justify-center items-center px-2 py-4">
        <div
          onClick={handleClose}
          className="w-full flex justify-end px-2 mb-2 cursor-pointer"
        >
          <Image src="/images/cbg-icon.svg" width={20} height={20} />
        </div>

        <p className="text-white text-center font-bold">{`The server has encountered a situation it doesn't know how to handle.`}</p>
      </div>
    </div>
  ) : null;
}
