import Image from 'next/image';

interface ErrorModalProps {
  isError: boolean;
  setIsError: (value: boolean) => void;
}

export default function ErrorModal({ isError, setIsError }: ErrorModalProps) {
  function handleClose() {
    setIsError(false);
  }

  return isError ? (
    <div className="w-screen h-screen fixed top-0 right-0 z-10 flex justify-center items-center bg-black/[0.5]">
      <div className="relative bg-primary w-[605px] h-[244px] flex flex-col justify-center items-center border-[1.5px] border-details">
        <div className="flex flex-col justify-center items-start">
          <div
            onClick={handleClose}
            className="absolute top-0 right-0 mt-2 mr-2"
          >
            <Image src="/images/x2-icon.svg" width={13} height={13} />
          </div>

          <p className="text-red text-[40px]">error</p>

          <p className="text-white text-[22px] max-w-[425px]">
            the server has encountered an unexpected error.
          </p>
        </div>
      </div>
    </div>
  ) : null;
}
