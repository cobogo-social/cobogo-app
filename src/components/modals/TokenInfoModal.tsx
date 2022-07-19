import ModalContainer from '@components/containers/ModalContainer';
import Image from 'next/image';
import { useEffect } from 'react';

interface TokenInfoModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function TokenInfoModal(props: TokenInfoModalProps) {
  function closeModal() {
    props.setIsOpen(false);
  }

  useEffect(() => {
    if (props.isOpen) {
      document.body.classList.add('active-modal');
    } else {
      document.body.classList.remove('active-modal');
    }
  }, [props.isOpen]);

  return props.isOpen ? (
    <ModalContainer>
      <div
        onClick={closeModal}
        className="absolute top-0 right-0 mt-5 mr-5 hover:cursor-pointer"
      >
        <Image src="/images/x2-icon.svg" width={13} height={13} alt="x2 icon" />
      </div>

      <div className="flex flex-col items-center gap-5">
        <Image
          src="/images/purple-cbg-flat-icon.svg"
          width={73}
          height={65}
          alt="purple cbg flat icon"
        />

        <p className="text-[40px]">CBG Token</p>

        <div className="flex flex-col gap-5">
          <p className="text-xl">
            CBG is the official token of cobogo. The token was not minted yet
            and is not listed on any exchange.
          </p>

          <strong>initial supply: 100,000,000</strong>
        </div>
      </div>
    </ModalContainer>
  ) : null;
}
