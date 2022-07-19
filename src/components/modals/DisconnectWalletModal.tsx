import ModalContainer from '@components/containers/ModalContainer';
import { WalletContext } from '@contexts/WalletContext';
import Image from 'next/image';
import { useContext, useEffect } from 'react';

import Button from '../Button';

interface DisconnectWalletModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setOnboardedFriendsChannels?: (value: []) => void;
  setPendingFriendsChannels?: (value: []) => void;
}

export default function DisconnectWalletModal(
  props: DisconnectWalletModalProps,
) {
  const { setCurrentWallet } = useContext(WalletContext);

  function closeModal() {
    props.setIsOpen(false);
  }

  function disconnectWallet() {
    setCurrentWallet('');
    props.setIsOpen(false);

    if (props.setOnboardedFriendsChannels) {
      props.setOnboardedFriendsChannels([]);
    }

    if (props.setPendingFriendsChannels) {
      props.setPendingFriendsChannels([]);
    }
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

      <p className="text-[40px]">wallet</p>

      <p className="text-[22px] max-w-[425px] mb-5">
        are you sure you want to disconnect your wallet?
      </p>

      <Button
        text="disconnect wallet"
        color="bg-gray6"
        onClick={disconnectWallet}
      />
    </ModalContainer>
  ) : null;
}
