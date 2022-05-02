import TokenInfo from '@components/TokenInfo';
import axios from 'axios';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

import DisconnectWalletModal from './DisconnectWalletModal';
import MetaMask from './MetaMask';

interface BlankslateTopBarProps {
  currentAccount: string;
  setCurrentAccount: (value: string) => void;
}

export default function BlankslateTopBar({
  currentAccount,
  setCurrentAccount,
}: BlankslateTopBarProps) {
  const [disconnectWalletModalIsOpen, setDisconnectWalletModalIsOpen] =
    useState(false);
  const [onboardedFriends, setOnboardedFriends] = useState(0);
  const [tokens, setTokens] = useState(0);

  function openDisconnectWalletModal() {
    setDisconnectWalletModalIsOpen(true);
  }

  const getInfo = useCallback(async () => {
    if (currentAccount) {
      await axios
        .get('/api/cobogo/readAccountByNameOrYoutubeAccountId', {
          params: {
            name: currentAccount,
          },
        })
        .then((response) => {
          if (response.data.data) {
            setOnboardedFriends(
              response.data.data.attributes.affiliates.data.length,
            );
            setTokens(response.data.data.attributes.tokens);
          }
        });
    }
  }, [currentAccount]);

  useEffect(() => {
    getInfo();
  }, [currentAccount, getInfo]);

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
                <MetaMask
                  currentAccount={currentAccount}
                  openDisconnectWalletModal={openDisconnectWalletModal}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
