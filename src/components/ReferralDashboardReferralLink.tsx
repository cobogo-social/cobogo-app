import { WalletContext } from '@contexts/WalletContext';
import Image from 'next/image';
import { useContext, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { IoCopySharp } from 'react-icons/io5';

interface ReferralDashboardReferralLinkProps {
  referralCode: string;
}

export default function ReferralDashboardReferralLink({
  referralCode,
}: ReferralDashboardReferralLinkProps) {
  const { currentWallet } = useContext(WalletContext);
  const [copied, setCopied] = useState(false);

  function changeCopied() {
    setCopied(true);
  }

  return (
    <div className="justify-center mb-8 flex">
      <div className="sm:px-4 h-[90px] sm:bg-gray4 flex flex-col sm:flex-row justify-center items-start sm:items-center">
        <p className="mb-2 sm:mb-0 sm:mr-2 sm:text-xs font-bold">
          your referral link
        </p>

        <div className="flex">
          <div
            className={`px-4 h-[50px] bg-black flex justify-center items-center border-[1px] ${
              currentWallet && 'border-r-0'
            } border-gray10`}
          >
            {currentWallet ? (
              <p className="text-xs font-bold text-blue sm:text-sm">
                app.cobogo.social/submit?ref={referralCode}
              </p>
            ) : (
              <p className="text-xs font-bold text-blue sm:text-sm">
                connect wallet to view information
              </p>
            )}
          </div>

          {currentWallet && (
            <div
              onClick={changeCopied}
              className="pr-4 h-[50px] bg-black border-[1px] border-l-0 border-gray10 outline-none flex justify-center items-center"
            >
              <CopyToClipboard
                text={`https://app.cobogo.social/submit?ref=${referralCode}`}
              >
                {copied ? (
                  <Image
                    src="/images/success-icon.svg"
                    width={11.5}
                    height={11.5}
                    alt="error icon"
                  />
                ) : (
                  <IoCopySharp className="hover:cursor-pointer" color="white" />
                )}
              </CopyToClipboard>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
