import Button from '@components/buttons/Button';
import ErrorModal from '@components/modals/ErrorModal';
import Link from '@components/others/Link';
import Loading from '@components/others/Loading';
import { useState } from 'react';

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

  return (
    <>
      <Loading isLoading={isLoading} />
      <ErrorModal isError={isError} setIsError={setIsError} />

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

          {!currentAccount ? (
            <Button
              text="connect wallet"
              color="bg-blue"
              hoverColor="brightness-90"
              width="w-[152px]"
              height="h-[38px]"
              onClick={connectWallet}
            />
          ) : (
            <Link href="/referral-dashboard">
              <Button
                text="view my referral link"
                color="bg-gray2"
                hoverColor="brightness-90"
                width="w-[196px]"
                height="h-[38px]"
              />
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
