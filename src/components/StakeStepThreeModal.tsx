import Image from 'next/image';

import Button from './Button';

interface StakeStepThreeModalProps {
  setIsOpen: (value: boolean) => void;
  setStep: (value: number) => void;
}

export default function StakeStepThreeModal({
  setIsOpen,
  setStep,
}: StakeStepThreeModalProps) {
  function closeModal() {
    setIsOpen(false);
  }

  function nextStep() {
    setStep(4);
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
            src="/images/tally-outlined-icon.svg"
            width={32}
            height={32}
            alt="tally outlined icon"
          />

          <div className="flex w-[9px] h-[9px] bg-green ml-2 rounded-full" />
        </div>

        <p className="text-white text-[22px] max-w-[438px] sm:mb-[30px]">
          change your network to Polygon.
        </p>

        <Button
          text="change to Polygon"
          color="bg-blue"
          hoverColor="brightness-90"
          width="w-[185px]"
          height="h-[38px]"
          onClick={nextStep}
        />
      </div>

      <div className="h-full bg-black w-[300px] border-l-[1.5px] border-gray5">
        <div className="w-full bg-blue h-[47px]" />

        <div className="py-[40px] px-[30px]">
          <p className="text-[22px]">Channel Name</p>

          <p>
            Follow the latest Rocket launch webcasts, Conferences & more
            space-related Livestream events. SPACE (Official) provides a
            Platform for Aerospace companies (...)
          </p>
        </div>
      </div>
    </div>
  );
}
