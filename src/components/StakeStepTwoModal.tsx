import { ErrorContext } from '@contexts/ErrorContext';
import { utils } from 'ethers';
import Image from 'next/image';
import { useCallback, useContext, useEffect } from 'react';

import Button from './Button';

interface StakeStepTwoModalProps {
  setIsOpen: (value: boolean) => void;
  setStep: (value: number) => void;
  title: string;
  description: string;
  bannerImage: string;
}

export default function StakeStepTwoModal({
  setIsOpen,
  setStep,
  title,
  description,
  bannerImage,
}: StakeStepTwoModalProps) {
  const { setError } = useContext(ErrorContext);

  function closeModal() {
    setIsOpen(false);
    setStep(1);
  }

  async function addOrChangePolygonToMetaMaskWallet() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { ethereum } = window as any;

      await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: utils.hexValue(137),
            chainName: 'Polygon',
            nativeCurrency: {
              name: 'MATIC',
              symbol: 'MATIC',
              decimals: 18,
            },
            rpcUrls: ['https://polygon-rpc.com/'],
            blockExplorerUrls: ['https://polygonscan.com/'],
          },
        ],
      });

      setStep(3);
    } catch (error) {
      setError(error.message);
    }
  }

  const checkIfNetworkIsPolygon = useCallback(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { ethereum } = window as any;

      if (ethereum.networkVersion === '137') {
        setStep(3);
      }
    } catch (error) {
      setError(error.message);
    }
  }, [setError, setStep]);

  useEffect(() => {
    checkIfNetworkIsPolygon();
  }, [checkIfNetworkIsPolygon]);

  return (
    <div className="relative bg-primary w-full sm:w-[858px] h-full sm:h-[412px] flex justify-between border-[1.5px] border-gray10 pl-[50px] pr-[50px] sm:pr-0 shadow-[0_0px_4px_10px_rgba(0,0,0,0.4)]">
      <div className="flex flex-col items-start justify-start py-[96px] sm:py-[57px]">
        <div
          onClick={closeModal}
          className="absolute right-0 mt-[20px] mr-[20px] hover:cursor-pointer top-10 sm:top-0"
        >
          <Image
            src="/images/x2-icon.svg"
            width={13}
            height={13}
            alt="x2 icon"
          />
        </div>

        <div className="flex items-center justify-center">
          <p className="text-white text-[40px] mr-2">stake</p>

          <Image
            src="/images/metamask-small-icon.svg"
            width={32}
            height={32}
            alt="metamask icon"
          />

          <div className="flex w-[9px] h-[9px] bg-green ml-2 rounded-full" />
        </div>

        <p className="text-white text-[22px] max-w-[438px] mb-[30px]">
          change your network to <span className="font-bold">Polygon.</span>
        </p>

        <div className="flex items-center justify-between mb-[64px] w-[309px]">
          <Image
            src="/images/polygon-icon.svg"
            width={78}
            height={68}
            alt="polygon icon"
          />

          <Image src="/images/arrow.svg" width={75} height={27} alt="arrow" />

          <Image
            src="/images/metamask-small-icon.svg"
            width={98}
            height={74}
            alt="metamask icon"
          />
        </div>

        <Button
          text="change to Polygon"
          color="bg-blue"
          onClick={addOrChangePolygonToMetaMaskWallet}
        />

        <div className="w-[249px] h-[274px] flex flex-col items-start sm:hidden mt-[20px]">
          <Image
            src="/images/polygon.svg"
            width={161}
            height={73}
            alt="polygon image"
          />
          <p>
            Polygon believes in Web3 for all. Polygon is a decentralised
            Ethereum scaling platform that enables developers to build scalable
            user-friendly dApps with low transaction fees without ever
            sacrificing on security.
          </p>
          <a
            href="https://polygon.technology/"
            className="font-bold text-blue"
            target="_blank"
            rel="noopener noreferrer"
          >
            learn more
          </a>{' '}
        </div>
      </div>

      <div className="h-full bg-black w-[300px] border-l-[1.5px] border-gray10 hidden sm:block">
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
