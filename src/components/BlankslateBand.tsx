import Button from '@components/Button';
import ErrorModal from '@components/ErrorModal';
import Link from '@components/Link';
import Loading from '@components/Loading';
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
      <ErrorModal isOpen={isError} setIsOpen={setIsError} />

      <div className="w-full h-[446px] sm:h-[228px] bg-secondary sm:mb-[50px] flex justify-start sm:justify-center items-start sm:items-center">
        <div className="px-[33px] sm:px-0 flex flex-col sm:flex-row">
          <div className="flex flex-col sm:mr-[100px] mt-[44px] sm:mt-0 mb-[44px] sm:mb-0">
            <p className="text-sm sm:text-base w-[274px] mb-4">
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
            <p className="text-sm sm:text-base w-[290px] mb-4">
              if you're a fan and want to earn CBG tokens too, connect your
              wallet and get your own referral link to invite YouTubers
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
      </div>
    </>
  );
}
