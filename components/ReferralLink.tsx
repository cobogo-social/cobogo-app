import CopyToClipboard from 'react-copy-to-clipboard';
import { IoCopySharp } from 'react-icons/io5';

interface ReferralLinkProps {
  referralCode: string;
}

export default function ReferralLink({ referralCode }: ReferralLinkProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="px-4 h-[90px] bg-secondary flex justify-center items-center border-[1.5px] border-details">
        <p className="font-bold text-white mr-2">your referral link</p>

        <div className="px-4 h-[50px] bg-black flex justify-center items-center border-[1.5px] border-r-0 border-details">
          <p className="text-blue font-bold text-xs sm:text-sm">
            https://app.cobogo.social/submit?ref={referralCode}
          </p>
        </div>

        <div
          className={`pr-4 h-[50px] bg-black border-[1.5px] border-l-0 border-details outline-none flex justify-center items-center`}
        >
          <CopyToClipboard
            text={`Hi! cobogo is a dapp that helps us fund ourselves sustainably using blockchain. Use my referral link when you sign up for free for the waitlist, and we both get rewards!
                    localhost:3000/submit?ref=${referralCode}`}
          >
            <IoCopySharp className="hover:cursor-pointer" color="white" />
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
}
