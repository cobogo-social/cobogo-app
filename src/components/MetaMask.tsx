import { WalletContext } from '@contexts/WalletContext';
import Image from 'next/image';
import { useContext, useState } from 'react';

import DisconnectWalletModal from './modals/DisconnectWalletModal';

interface MetaMaskProps {
  setOnboardedFriendsChannels?: (value: []) => void;
  setPendingFriendsChannels?: (value: []) => void;
  setSidebarOpened?: (value: boolean) => void;
}

export default function MetaMask(props: MetaMaskProps) {
  const [disconnectWalletModalIsOpen, setDisconnectWalletModalIsOpen] =
    useState(false);
  const { currentWallet, connectMetaMaskWallet } = useContext(WalletContext);

  function openDisconnectWalletModal() {
    props.setSidebarOpened(true);
    setDisconnectWalletModalIsOpen(true);
  }

  return (
    <>
      <DisconnectWalletModal
        isOpen={disconnectWalletModalIsOpen}
        setIsOpen={setDisconnectWalletModalIsOpen}
        setOnboardedFriendsChannels={props.setOnboardedFriendsChannels}
        setPendingFriendsChannels={props.setPendingFriendsChannels}
      />

      {currentWallet ? (
        <div
          onClick={openDisconnectWalletModal}
          className="flex items-center justify-center hover:cursor-pointer"
        >
          <Image
            src="/images/metamask-small-icon.svg"
            width={32}
            height={32}
            alt="metamask small icon"
          />

          <p className="flex ml-2 font-bold">
            {currentWallet.slice(0, 5)}...{currentWallet.slice(38)}
          </p>

          <div className="flex w-[9px] h-[9px] bg-green ml-2 rounded-full" />
        </div>
      ) : (
        <button
          onClick={() => connectMetaMaskWallet()}
          className="flex ml-2 font-bold"
        >
          connect wallet
        </button>
      )}
    </>
  );
}
