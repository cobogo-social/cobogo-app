import { useState } from 'react';

import StakeStepFiveModal from './StakeStepFiveModal';
import StakeStepFourModal from './StakeStepFourModal';
import StakeStepOneModal from './StakeStepOneModal';
import StakeStepSixModal from './StakeStepSixModal';
import StakeStepThreeModal from './StakeStepThreeModal';
import StakeStepTwoModal from './StakeStepTwoModal';

interface StakeStepsModalsProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function StakeStepsModals({
  isOpen,
  setIsOpen,
}: StakeStepsModalsProps) {
  const [step, setStep] = useState(1);

  return isOpen ? (
    <div className="w-screen h-screen fixed top-0 right-0 z-10 flex justify-center items-center bg-black/[0.5]">
      {step === 1 && (
        <StakeStepOneModal setIsOpen={setIsOpen} setStep={setStep} />
      )}

      {step === 2 && (
        <StakeStepTwoModal setIsOpen={setIsOpen} setStep={setStep} />
      )}

      {step === 3 && (
        <StakeStepThreeModal setIsOpen={setIsOpen} setStep={setStep} />
      )}

      {step === 4 && (
        <StakeStepFourModal setIsOpen={setIsOpen} setStep={setStep} />
      )}

      {step === 5 && (
        <StakeStepFiveModal setIsOpen={setIsOpen} setStep={setStep} />
      )}

      {step === 6 && (
        <StakeStepSixModal setIsOpen={setIsOpen} setStep={setStep} />
      )}
    </div>
  ) : null;
}
