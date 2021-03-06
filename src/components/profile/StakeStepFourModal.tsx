import Image from 'next/image';

import Button from '../Button';
import StakeCBGAmountInput from '../StakeCBGAmountInput';
import StakeERC721Input from '../StakeERC721Input';

interface StakeStepFourModalProps {
  setIsOpen: (value: boolean) => void;
  setStep: (value: number) => void;
  title: string;
  description: string;
  bannerImage: string;
}

export default function StakeStepFourModal({
  setIsOpen,
  setStep,
  title,
  description,
  bannerImage,
}: StakeStepFourModalProps) {
  function closeModal() {
    setIsOpen(false);
    setStep(1);
  }

  function nextStep() {
    setStep(5);
  }

  return (
    <div className="relative bg-primary w-full sm:w-[858px] h-full sm:h-[412px] flex justify-between border border-gray10 pl-[50px] pr-[50px] sm:pr-0 shadow-[0_0px_4px_10px_rgba(0,0,0,0.4)]">
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

          <div className="hidden sm:flex">
            <Image
              src="/images/metamask-small-icon.svg"
              width={32}
              height={32}
              alt="metamask icon"
            />

            <div className="flex w-[9px] h-[9px] bg-green ml-2 mr-4 rounded-full" />
          </div>

          <Image
            src="/images/polygon-icon.svg"
            width={30}
            height={26}
            alt="polygon icon"
          />

          <div className="flex w-[9px] h-[9px] bg-green ml-2 rounded-full" />
        </div>

        <p className="text-white text-[22px] max-w-[438px] mb-[30px]">
          type an amount and submit.
        </p>

        <div className="flex flex-col sm:flex-row mb-[20px]">
          <div className="mb-[12px] sm:mr-[20px]">
            <p className="font-bold mb-[10px]">CBG (ERC-721)</p>

            <StakeERC721Input />
          </div>

          <div>
            <p className="font-bold mb-[10px]">amount</p>

            <StakeCBGAmountInput />
          </div>
        </div>

        <Button
          text="approve"
          color="bg-blue"
          width="w-[103px]"
          height="h-[38px]"
          onClick={nextStep}
        />
      </div>

      <div className="h-full bg-black w-[300px] border-l-[1px] border-gray10 hidden sm:block">
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
