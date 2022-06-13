import Button from '@components/Button';
import Link from '@components/Link';
import { LoadingContext } from '@contexts/LoadingContext';
import { WalletContext } from '@contexts/WalletContext';
import { useContext } from 'react';

interface BlankslateBandProps {
  referralCode: string;
}

export default function BlankslateBand({ referralCode }: BlankslateBandProps) {
  const { setLoading } = useContext(LoadingContext);
  const { currentWallet, connectMetaMaskWallet } = useContext(WalletContext);

  return (
    <div className="w-full h-[446px] sm:h-[228px] bg-secondary sm:mb-[50px] flex justify-start sm:justify-center items-start sm:items-center">
      <div className="px-[33px] sm:px-0 flex flex-col sm:flex-row">
        <div className="flex flex-col sm:mr-[100px] mt-[44px] sm:mt-0 mb-[44px] sm:mb-0">
          <p className="text-sm sm:text-base w-[274px] mb-4">
            if you're a YouTuber, start your submission now and be one of the
            first in this new Creator Economy.
          </p>

          <Link href={`/submit?ref=${referralCode || ''}`}>
            <Button
              text="join whitelist"
              color="bg-purple"
              width="w-[129px]"
              height="h-[38px]"
              onClick={() => setLoading(true)}
            />
          </Link>
        </div>

        <div className="flex flex-col">
          <p className="text-sm sm:text-base w-[290px] mb-4">
            if you're a fan and want to earn CBG tokens too, connect your wallet
            and get your own referral link to invite YouTubers
          </p>

          {!currentWallet ? (
            <Button
              text="connect wallet"
              color="bg-blue"
              width="w-[152px]"
              height="h-[38px]"
              onClick={connectMetaMaskWallet}
            />
          ) : (
            <Link href="/referral-dashboard">
              <Button
                text="view my referral link"
                color="bg-gray2"
                width="w-[196px]"
                height="h-[38px]"
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
