import Image from 'next/image';
import { useState } from 'react';

import DisconnectWalletModal from './DisconnectWalletModal';
import MetaMask from './MetaMask';

interface ReferralDashboardTopBarProps {
  currentWallet: string;
  setCurrentWallet: (value: string) => void;
  connectWallet: () => void;
  setOnboardedFriendsChannels: (value: []) => void;
  setPendingFriendsChannels: (value: []) => void;
}

export default function ReferralDashboardTopBar({
  currentWallet,
  setCurrentWallet,
  connectWallet,
  setOnboardedFriendsChannels,
  setPendingFriendsChannels,
}: ReferralDashboardTopBarProps) {
  const [disconnectWalletModalIsOpen, setDisconnectWalletModalIsOpen] =
    useState(false);

  function openDisconnectWalletModal() {
    setDisconnectWalletModalIsOpen(true);
  }

  return (
    <>
      <DisconnectWalletModal
        setCurrentWallet={setCurrentWallet}
        isOpen={disconnectWalletModalIsOpen}
        setIsOpen={setDisconnectWalletModalIsOpen}
        setOnboardedFriendsChannels={setOnboardedFriendsChannels}
        setPendingFriendsChannels={setPendingFriendsChannels}
      />

      <div className="hidden sm:flex w-full justify-between items-center mb-[70px] px-8 pt-8">
        <Image src="/images/logo.svg" width={120} height={27} alt="logo" />

        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center">
              {currentWallet ? (
                <MetaMask
                  currentWallet={currentWallet}
                  openDisconnectWalletModal={openDisconnectWalletModal}
                />
              ) : (
                <button onClick={connectWallet} className="flex ml-2 font-bold">
                  connect wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
