import Image from 'next/image';

interface StakeStepFiveModalProps {
  setIsOpen: (value: boolean) => void;
  setStep: (value: number) => void;
}

export default function StakeStepFiveModal({
  setIsOpen,
  setStep,
}: StakeStepFiveModalProps) {
  function closeModal() {
    setIsOpen(false);
    setStep(1);
  }

  return (
    <div className="relative bg-primary w-full sm:w-[858px] h-full sm:h-[412px] flex justify-between border border-gray10 shadow-[0_0px_4px_10px_rgba(0,0,0,0.4)]">
      <div className="flex flex-col items-center justify-center py-[96px] sm:py-[57px] w-full">
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

        <Image
          src="/images/success-icon.svg"
          width={56}
          height={56}
          alt="success icon"
        />

        <p className="text-[30px]">success!</p>
      </div>
    </div>
  );
}
