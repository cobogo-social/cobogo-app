import ReferralLink from '@components/ReferralLink';
import Image from 'next/image';
import { useEffect } from 'react';

interface ReferralLinkModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  referralCode: string;
}

export default function ReferralLinkModal({
  isOpen,
  setIsOpen,
  referralCode,
}: ReferralLinkModalProps) {
  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('active-modal');
    } else {
      document.body.classList.remove('active-modal');
    }
  }, [isOpen]);

  return isOpen ? (
    <div className="w-screen h-screen fixed top-0 right-0 z-10 flex justify-center items-center bg-black/[0.5]">
      <div className="relative bg-primary w-[605px] h-[449px] flex flex-col justify-center border-[1.5px] border-gray10 px-[70px] shadow-[0_0px_4px_10px_rgba(0,0,0,0.4)]">
        <div className="flex flex-col items-start justify-center">
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

          <p className="text-[40px]">invite YouTubers</p>

          <p className="text-[22px] max-w-[425px] mb-8">
            you can earn 50 CBG for each Creator that joins the whitelist using
            your referral link!
          </p>

          <ReferralLink referralCode={referralCode} />

          <p className="sm:text-lg">
            <a
              href="https://docs.cobogo.social/youtubers/referral-program"
              className="font-bold text-blue"
              target="_blank"
              rel="noopener noreferrer"
            >
              learn more
            </a>{' '}
            about our <span className="font-bold">Referral Program.</span>
          </p>
        </div>
      </div>
    </div>
  ) : null;
}
