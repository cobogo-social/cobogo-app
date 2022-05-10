import Image from 'next/image';
import { useCallback, useEffect } from 'react';

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

      await ethereum.request({
        method: 'eth_requestAccounts',
      });

      setStep(2);
    } catch (error) {
      console.error(error);
    }
  }

  const checkIfWalletIsConnected = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { ethereum } = window as any;

    try {
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        setStep(2);
      }
    } catch (error) {
      console.error(error);
    }
  }, [setStep]);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [checkIfWalletIsConnected]);

  return (
    <div className="relative bg-primary w-[858px] h-[412px] flex justify-between border-[1.5px] border-gray5 pl-[50px]">
      <div className="flex flex-col items-start justify-start py-[57px]">
        <div
          onClick={closeModal}
          className="absolute top-0 right-0 mt-[20px] mr-[20px] hover:cursor-pointer"
        >
          <Image
            src="/images/x2-icon.svg"
            width={13}
            height={13}
            alt="x2 icon"
          />
        </div>

        <p className="text-white text-[40px]">stake</p>

        <p className="text-white text-[22px] max-w-[438px] sm:mb-[30px]">
          you need to connect your <span className="font-bold">MetaMask</span>{' '}
          wallet.
        </p>

        <div className="flex items-center justify-center mb-[64px]">
          <Image
            src="/images/metamask-small-icon.svg"
            width={98}
            height={74}
            alt="tally icon"
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

      <div className="h-full bg-black w-[300px] border-l-[1.5px] border-gray5">
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
