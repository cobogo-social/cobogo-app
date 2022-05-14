import Image from 'next/image';

import Button from './Button';

interface DisconnectWalletModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setCurrentAccount: (value: string) => void;
  setOnboardedFriendsChannels?: (value: []) => void;
  setPendingFriendsChannels?: (value: []) => void;
}

export default function DisconnectWalletModal({
  isOpen,
  setIsOpen,
  setCurrentAccount,
  setOnboardedFriendsChannels,
  setPendingFriendsChannels,
}: DisconnectWalletModalProps) {
  function closeModal() {
    setIsOpen(false);
  }

  function disconnectWallet() {
    setCurrentAccount('');
    setIsOpen(false);

    if (setOnboardedFriendsChannels) {
      setOnboardedFriendsChannels([]);
    }

    if (setPendingFriendsChannels) {
      setPendingFriendsChannels([]);
    }
  }

  return isOpen ? (
    <div className="w-screen h-screen fixed top-0 right-0 z-10 flex justify-center items-center bg-black/[0.5]">
      <div className="relative bg-primary w-[605px] h-[303px] flex flex-col justify-center items-center border-[1.5px] border-gray5 px-[70px]">
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

          <p className="text-[40px]">wallet</p>

          <p className="text-[22px] max-w-[425px] mb-[45px]">
            are you sure you want to disconnect your wallet?
          </p>

          <Button
            text="disconnect wallet"
            color="bg-gray6"
            width="w-[202px]"
            height="h-[38px]"
            onClick={disconnectWallet}
          />
        </div>
      </div>
    </div>
  ) : null;
}
