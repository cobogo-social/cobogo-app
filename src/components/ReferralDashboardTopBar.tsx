import Image from 'next/image';
import { useState } from 'react';

import DisconnectWalletModal from './DisconnectWalletModal';
import MetaMask from './MetaMask';

interface ReferralDashboardTopBarProps {
  currentAccount: string;
  setCurrentAccount: (value: string) => void;
  connectWallet: () => void;
  setOnboardedFriendsChannels: (value: []) => void;
  setPendingFriendsChannels: (value: []) => void;
}

export default function ReferralDashboardTopBar({
  currentAccount,
  setCurrentAccount,
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
        setCurrentAccount={setCurrentAccount}
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
              {currentAccount ? (
                <MetaMask
                  currentAccount={currentAccount}
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
