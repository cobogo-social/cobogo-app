import { MesssageContext } from '@contexts/MessageContext';
import Image from 'next/image';
import { useContext, useEffect } from 'react';

export default function MessageModal() {
  const { message, setMessage } = useContext(MesssageContext);

  function closeModal() {
    setMessage({
      text: '',
      type: 'none',
    });
  }

  useEffect(() => {
    if (message) {
      document.body.classList.add('active-modal');
    } else {
      document.body.classList.remove('active-modal');
    }
  }, [message]);

  return message.type !== 'none' ? (
    <div className="w-screen h-screen fixed top-0 right-0 z-10 flex justify-center items-center bg-black/[0.5]">
      <div className="relative bg-primary w-[605px] flex flex-col justify-center items-center border-[1px] border-gray10 p-[70px] shadow-[0_0px_4px_10px_rgba(0,0,0,0.4)]">
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

          <p
            className={`${
              message.type === 'warning' ? 'text-orange' : 'text-red'
            } text-[40px]`}
          >
            {message.type}
          </p>

          <p className="text-[22px] max-w-[425px]">{message.text}</p>
        </div>
      </div>
    </div>
  ) : null;
}
