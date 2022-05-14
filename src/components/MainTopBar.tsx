import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Button from './Button';
import DisconnectWalletModal from './DisconnectWalletModal';
import Link from './Link';
import MetaMask from './MetaMask';

interface MainTopBarProps {
  connectWallet: () => void;
  currentAccount: string;
  setCurrentAccount: (value: string) => void;
}

export default function MainTopBar({
  connectWallet,
  currentAccount,
  setCurrentAccount,
}: MainTopBarProps) {
  const { asPath } = useRouter();
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

      <div className="h-[100px] w-full hidden sm:flex justify-between items-center px-[39px]">
        <Image src="/images/logo.svg" width={120} height={27} alt="logo" />

        <div className="flex items-center justify-center">
          {asPath !== '/' && (
            <Link href="/">
              <button className="font-bold mr-[40px]">back to home</button>
            </Link>
          )}

          <div className="mr-[40px]">
            <Link href="/submit">
              <Button
                text="submit a channel"
                color="bg-purple"
                hoverColor="brightness-90"
                width="w-[174px]"
                height="h-[38px]"
              />
            </Link>
          </div>

          <div className="flex items-center justify-center hover:cursor-pointer">
            {currentAccount ? (
              <MetaMask
                currentAccount={currentAccount}
                openDisconnectWalletModal={openDisconnectWalletModal}
              />
            ) : (
              <button onClick={connectWallet} className="font-bold">
                connect wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
