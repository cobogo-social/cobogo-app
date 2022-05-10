import Image from 'next/image';

import Button from './Button';
import StakeCBGAmountInput from './StakeCBGAmountInput';
import StakeERC721Input from './StakeERC721Input';

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

        <div className="flex items-center justify-center">
          <p className="text-white text-[40px] mr-2">stake</p>

          <Image
            src="/images/metamask-small-icon.svg"
            width={32}
            height={32}
            alt="metamask icon"
          />

          <div className="flex w-[9px] h-[9px] bg-green ml-2 mr-4 rounded-full" />

          <Image
            src="/images/polygon-icon.svg"
            width={30}
            height={26}
            alt="polygon icon"
          />

          <div className="flex w-[9px] h-[9px] bg-green ml-2 rounded-full" />
        </div>

        <p className="text-white text-[22px] max-w-[438px] sm:mb-[30px]">
          type an amount and submit.
        </p>

        <div className="flex mb-[20px]">
          <div className="mr-[20px]">
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
          hoverColor="brightness-90"
          width="w-[103px]"
          height="h-[38px]"
          onClick={nextStep}
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
