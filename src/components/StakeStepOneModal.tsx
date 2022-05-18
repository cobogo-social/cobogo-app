import { ErrorContext } from '@contexts/ErrorContext';
import axios from 'axios';
import Image from 'next/image';
import { useCallback, useContext, useEffect } from 'react';

import Button from './Button';

interface StakeStepOneModalProps {
  setIsOpen: (value: boolean) => void;
  setStep: (value: number) => void;
  title: string;
  description: string;
  bannerImage: string;
}

export default function StakeStepOneModal({
  setIsOpen,
  setStep,
  title,
  description,
  bannerImage,
}: StakeStepOneModalProps) {
  const { setError } = useContext(ErrorContext);

  function closeModal() {
    setIsOpen(false);
    setStep(1);
  }

  async function connectMetaMaskWallet() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { ethereum } = window as any;

      if (!ethereum) {
        return;
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      const address = accounts[0];

      const createAccount = await axios.post(
        '/api/cobogo/createAccountToFanOrYoutuber',
        {
          name: address,
        },
      );

      if (createAccount.data.data) {
        await axios.post('/api/cobogo/createWallet', {
          address,
          account: createAccount.data.data.id,
        });

        setStep(2);
      } else {
        setStep(2);
      }
    } catch (error) {
      setError(error.message);
    }
  }

  const checkIfWalletIsConnected = useCallback(async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { ethereum } = window as any;

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        setStep(2);
      }
    } catch (error) {
      setError(error.message);
    }
  }, [setError, setStep]);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [checkIfWalletIsConnected]);

  return (
    <div className="relative bg-primary w-full sm:w-[858px] h-full sm:h-[412px] flex justify-between border-[1.5px] border-gray5 pl-[50px] pr-[50px] sm:pr-0 shadow-[0_0px_0px_10px_rgba(0,0,0,0.4)]">
      <div className="flex flex-col items-start justify-start py-[96px] sm:py-[57px]">
        <div
          onClick={closeModal}
          className="absolute top-10 sm:top-0 right-0 mt-[20px] mr-[20px] hover:cursor-pointer"
        >
          <Image
            src="/images/x2-icon.svg"
            width={13}
            height={13}
            alt="x2 icon"
          />
        </div>

        <p className="text-white text-[40px]">stake</p>

        <p className="text-white text-[22px] max-w-[438px] mb-[30px]">
          you need to connect your <span className="font-bold">MetaMask</span>{' '}
          wallet.
        </p>

        <div className="flex items-center justify-center mb-[64px]">
          <Image
            src="/images/metamask-small-icon.svg"
            width={98}
            height={74}
            alt="metamask icon"
          />

          <p className="font-bold text-gray3 max-w-[241px]">
            available as a browser extension and as a mobile app.
          </p>
        </div>

        <Button
          text="connect to MetaMask"
          color="bg-blue"
          onClick={connectMetaMaskWallet}
        />
      </div>

      <div className="h-full bg-black w-[300px] border-l-[1.5px] border-gray5 hidden sm:block">
        {bannerImage ? (
          <Image
            src={bannerImage}
            objectFit="cover"
            width={298}
            height={47}
            alt={bannerImage}
          />
        ) : (
          <div className="w-full bg-blue h-[47px]" />
        )}

        <div className="py-[40px] px-[30px]">
          <p className="text-[22px]">{title}</p>

          <p>{description.slice(0, 154)} (...)</p>
        </div>
      </div>
    </div>
  );
}
