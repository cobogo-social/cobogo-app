import { useState } from 'react';

import Button from './Button';
import ErrorModal from './ErrorModal';
import Link from './Link';
import Loading from './Loading';
import ReferralLinkModal from './ReferralLinkModal';

interface BlankslateBandProps {
  referralCode: string;
  connectWallet: () => void;
  isError: boolean;
  setIsError: (value: boolean) => void;
  currentAccount: string;
}

export default function BlankslateBand({
  referralCode,
  connectWallet,
  isError,
  setIsError,
  currentAccount,
}: BlankslateBandProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function handleOpenReferralLinkModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Loading isLoading={isLoading} />
      <ErrorModal isError={isError} setIsError={setIsError} />
      <ReferralLinkModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        referralCode={referralCode}
      />

      <div className="w-full h-[228px] bg-secondary mb-[50px] flex justify-center items-center">
        <div className="flex flex-col mr-[100px]">
          <p className="w-[274px] mb-4">
            if you're a YouTuber, start your submission now and be one of the
            first in this new Creator Economy.
          </p>

          <Link href={`/submit?ref=${referralCode}`}>
            <Button
              text="join waitlist"
              color="bg-purple"
              hoverColor="brightness-90"
              width="w-[129px]"
              height="h-[38px]"
              onClick={() => setIsLoading(true)}
            />
          </Link>
        </div>

        <div className="flex flex-col">
          <p className="w-[290px] mb-4">
            if you're a fan and want to earn CBG tokens too, connect your wallet
            and get your own referral link to invite YouTubers
          </p>

          <Button
            text={currentAccount ? 'view my referral link' : 'connect wallet'}
            color={currentAccount ? 'bg-gray2' : 'bg-blue'}
            hoverColor="brightness-90"
            width={currentAccount ? 'w-[196px]' : 'w-[152px]'}
            height="h-[38px]"
            onClick={
              currentAccount ? handleOpenReferralLinkModal : connectWallet
            }
          />
        </div>
      </div>
    </>
  );
}
