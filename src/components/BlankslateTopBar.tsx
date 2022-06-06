import TokenInfo from '@components/TokenInfo';
import axios from 'axios';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

import DisconnectWalletModal from './DisconnectWalletModal';
import MetaMask from './MetaMask';

interface BlankslateTopBarProps {
  currentWallet: string;
  setCurrentWallet: (value: string) => void;
}

export default function BlankslateTopBar({
  currentWallet,
  setCurrentWallet,
}: BlankslateTopBarProps) {
  const [disconnectWalletModalIsOpen, setDisconnectWalletModalIsOpen] =
    useState(false);
  const [onboardedFriends, setOnboardedFriends] = useState(0);
  const [tokens, setTokens] = useState(0);

  function openDisconnectWalletModal() {
    setDisconnectWalletModalIsOpen(true);
  }

  const getInfo = useCallback(async () => {
    if (currentWallet) {
      await axios
        .get('/api/cobogo/readAccountByWallet', {
          params: {
            walletAddress: currentWallet,
          },
        })
        .then(async (response) => {
          if (response.data.data) {
            const account = response.data.data;
            const accountsByReferralId = await axios.get(
              '/api/cobogo/readAccountsByReferralId',
              {
                params: {
                  referralId: account.id,
                },
              },
            );

            accountsByReferralId.data.data.forEach((accountByReferralId) => {
              const waitlisted =
                accountByReferralId.attributes.profiles.data[0].attributes
                  .waitlist;

              if (waitlisted) {
                setOnboardedFriends((c) => c + 1);
              }
            });
            setTokens(response.data.data.attributes.tokens);
          }
        });
    }
  }, [currentWallet]);

  useEffect(() => {
    getInfo();
  }, [getInfo]);

  return (
    <>
      <DisconnectWalletModal
        setCurrentWallet={setCurrentWallet}
        isOpen={disconnectWalletModalIsOpen}
        setIsOpen={setDisconnectWalletModalIsOpen}
      />

      <div className="hidden sm:flex w-full justify-between items-center mb-[70px] px-8 pt-8">
        <Image src="/images/logo.svg" width={120} height={27} alt="logo" />

        {currentWallet && (
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
                  currentWallet={currentWallet}
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
