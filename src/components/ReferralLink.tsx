import Image from 'next/image';
import { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { IoCopySharp } from 'react-icons/io5';

interface ReferralLinkProps {
  referralCode: string;
}

export default function ReferralLink({ referralCode }: ReferralLinkProps) {
  const [copied, setCopied] = useState(false);

  function handleSetCopy() {
    setCopied(true);
  }

  return (
    <div className="flex justify-center mb-8">
      <div className="px-4 h-[90px] bg-secondary flex justify-center items-center border-[1.5px] border-details">
        <p className="font-bold text-white mr-2">your referral link</p>

        <div className="px-4 h-[50px] bg-black flex justify-center items-center border-[1.5px] border-r-0 border-details">
          <p className="text-blue font-bold text-xs sm:text-sm">
            app.cobogo.social/submit?ref={referralCode}
          </p>
        </div>

        <div
          onClick={handleSetCopy}
          className={`pr-4 h-[50px] bg-black border-[1.5px] border-l-0 border-details outline-none flex justify-center items-center`}
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
      </div>
    </div>
  );
}
