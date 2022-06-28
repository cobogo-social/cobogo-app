import { MesssageContext } from '@contexts/MessageContext';
import Image from 'next/image';
import { useContext, useEffect } from 'react';

import ModalContainer from './ModalContainer';

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
    <ModalContainer open={!!message.text}>
      <div
        onClick={closeModal}
        className="absolute top-0 right-0 mt-[20px] mr-[20px] hover:cursor-pointer"
      >
        <Image src="/images/x2-icon.svg" width={13} height={13} alt="x2 icon" />
      </div>

      <p
        className={`${
          message.type === 'warning' ? 'text-orange' : 'text-red'
        } text-[40px]`}
      >
        {message.type}
      </p>

      <p className="text-[22px]">{message.text}</p>
    </ModalContainer>
  ) : null;
}
