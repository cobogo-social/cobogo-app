import { LoadingContext } from '@contexts/LoadingContext';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

import Button from './Button';
import DisconnectWalletModal from './DisconnectWalletModal';
import Link from './Link';
import MetaMask from './MetaMask';

interface MainTopBarProps {
  connectWallet: () => void;
  currentWallet: string;
  setCurrentWallet: (value: string) => void;
}

export default function MainTopBar({
  connectWallet,
  currentWallet,
  setCurrentWallet,
}: MainTopBarProps) {
  const { asPath } = useRouter();
  const [disconnectWalletModalIsOpen, setDisconnectWalletModalIsOpen] =
    useState(false);
  const { setLoading } = useContext(LoadingContext);

  function openDisconnectWalletModal() {
    setDisconnectWalletModalIsOpen(true);
  }

  return (
    <>
      <DisconnectWalletModal
        setCurrentWallet={setCurrentWallet}
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
                width="w-[174px]"
                height="h-[38px]"
                onClick={() => setLoading(true)}
              />
            </Link>
          </div>

          <div className="flex items-center justify-center hover:cursor-pointer">
            {currentWallet ? (
              <MetaMask
                currentWallet={currentWallet}
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
