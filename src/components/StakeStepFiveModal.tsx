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
    <div className="relative bg-primary w-[858px] h-[412px] flex justify-between border-[1.5px] border-gray5">
      <div className="flex flex-col items-center justify-center py-[57px] w-full">
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
