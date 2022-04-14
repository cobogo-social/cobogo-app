import Image from 'next/image';
import { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { IoCopySharp } from 'react-icons/io5';

interface MobileReferralLinkProps {
  referralCode: string;
}

export default function MobileReferralLink({
  referralCode,
}: MobileReferralLinkProps) {
  const [copied, setCopied] = useState(false);

  function handleSetCopy() {
    setCopied(true);
  }

  return (
    <div className="flex flex-col justify-center mb-8 sm:hidden">
      <p className="mb-2 font-bold">your referral link</p>

      <div className="flex">
        <div className="px-4 h-[50px] bg-black flex justify-center items-center border-[1.5px] border-r-0 border-gray5">
          <p className="text-xs font-bold text-blue sm:text-sm">
            app.cobogo.social/submit?ref={referralCode}
          </p>
        </div>

        <div
          onClick={handleSetCopy}
          className="pr-4 h-[50px] bg-black border-[1.5px] border-l-0 border-gray5 outline-none flex justify-center items-center"
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
