import Image from 'next/image';
import { useState } from 'react';

import DisconnectWalletModal from './DisconnectWalletModal';

interface ReferralDashboardTopBarProps {
  currentAccount: string;
  setCurrentAccount: (value: string) => void;
  connectWallet: () => void;
}

export default function ReferralDashboardTopBar({
  currentAccount,
  setCurrentAccount,
  connectWallet,
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
      />

      <div className="hidden sm:flex w-full justify-between items-center mb-[70px] px-8 pt-8">
        <Image src="/images/logo.svg" width={120} height={27} alt="logo" />

        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center">
              {currentAccount ? (
                <>
                  <div
                    onClick={openDisconnectWalletModal}
                    className="flex hover:cursor-pointer"
                  >
                    <Image
                      src="/images/metamask-small-icon.svg"
                      width={32}
                      height={32}
                      alt="metamask small icon"
                    />
                  </div>

                  <p className="flex ml-2 font-bold">
                    {currentAccount.slice(0, 5)}...{currentAccount.slice(38)}
                  </p>
                </>
              ) : (
                <button onClick={connectWallet} className="flex ml-2 font-bold">
                  connect wallet
                </button>
              )}

              {currentAccount && (
                <div className="flex w-[9px] h-[9px] bg-green ml-2 rounded-full" />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
