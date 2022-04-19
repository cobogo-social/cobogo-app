import TokenInfo from '@components/TokenInfo';
import Image from 'next/image';
import { useState } from 'react';

import DisconnectWalletModal from './DisconnectWalletModal';

interface BlankslateTopBarProps {
  onboardedFriends: number;
  currentAccount: string;
  setCurrentAccount: (value: string) => void;
  tokens: number;
}

export default function BlankslateTopBar({
  onboardedFriends,
  currentAccount,
  setCurrentAccount,
  tokens,
}: BlankslateTopBarProps) {
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

        {currentAccount && (
          <div className="flex items-center justify-center">
            <p className="mr-8">
              onboarded friends:{' '}
              <span className="font-bold text-green">{onboardedFriends}</span>
            </p>

            <div className="flex items-center justify-center">
              <div className="mr-8">
                <TokenInfo tokens={tokens} />
              </div>

              <div className="flex items-center justify-center">
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

                <div className="flex w-[9px] h-[9px] bg-green ml-2 rounded-full" />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
