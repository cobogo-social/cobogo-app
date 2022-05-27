import { ErrorContext } from '@contexts/ErrorContext';
import Image from 'next/image';
import { useContext, useEffect } from 'react';

export default function ErrorModal() {
  const { error, setError } = useContext(ErrorContext);

  function closeModal() {
    setError('');
  }

  useEffect(() => {
    if (error) {
      document.body.classList.add('active-modal');
    } else {
      document.body.classList.remove('active-modal');
    }
  }, [error]);

  return error ? (
    <div className="w-screen h-screen fixed top-0 right-0 z-10 flex justify-center items-center bg-black/[0.5]">
      <div className="relative bg-primary w-[605px] min-h-[244px] flex flex-col justify-center items-center border-[1.5px] border-gray10 px-[70px] shadow-[0_0px_0px_10px_rgba(0,0,0,0.4)]">
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

          <p className="text-[22px] max-w-[425px]">{error}</p>
        </div>
      </div>
    </div>
  ) : null;
}
