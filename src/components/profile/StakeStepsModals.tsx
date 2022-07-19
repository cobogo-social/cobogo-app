import { useEffect, useState } from 'react';

import StakeStepFiveModal from './StakeStepFiveModal';
import StakeStepFourModal from './StakeStepFourModal';
import StakeStepOneModal from './StakeStepOneModal';
import StakeStepThreeModal from './StakeStepThreeModal';
import StakeStepTwoModal from './StakeStepTwoModal';

interface StakeStepsModalsProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  title: string;
  description: string;
  bannerImage: string;
}

export default function StakeStepsModals({
  isOpen,
  setIsOpen,
  title,
  description,
  bannerImage,
}: StakeStepsModalsProps) {
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('active-modal');
    } else {
      document.body.classList.remove('active-modal');
    }
  }, [isOpen]);

  return isOpen ? (
    <div className="w-screen h-screen fixed top-0 right-0 z-10 flex justify-center items-center bg-black/[0.8]">
      {step === 1 && (
        <StakeStepOneModal
          setIsOpen={setIsOpen}
          setStep={setStep}
          title={title}
          description={description}
          bannerImage={bannerImage}
        />
      )}

      {step === 2 && (
        <StakeStepTwoModal
          setIsOpen={setIsOpen}
          setStep={setStep}
          title={title}
          description={description}
          bannerImage={bannerImage}
        />
      )}

      {step === 3 && (
        <StakeStepThreeModal
          setIsOpen={setIsOpen}
          setStep={setStep}
          title={title}
          description={description}
          bannerImage={bannerImage}
        />
      )}

      {step === 4 && (
        <StakeStepFourModal
          setIsOpen={setIsOpen}
          setStep={setStep}
          title={title}
          description={description}
          bannerImage={bannerImage}
        />
      )}

      {step === 5 && (
        <StakeStepFiveModal setIsOpen={setIsOpen} setStep={setStep} />
      )}
    </div>
  ) : null;
}
