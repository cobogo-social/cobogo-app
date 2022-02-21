import Image from 'next/image';
import Link from 'next/link';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { IoCopySharp } from 'react-icons/io5';

interface ReferralContainerProps {
  referralCode: string;
}

export default function ReferralContainer({
  referralCode,
}: ReferralContainerProps) {
  return (
    <div>
      <div className="w-[431px] h-[222px] bg-secondary flex flex-col justify-between p-8 mb-12">
        <div className="flex justify-between items-center">
          <p className="text-2xl text-white">invite</p>

          <p className="text-white">
            accepted: <span className="text-blue font-bold">17</span>
          </p>
        </div>

        <div>
          <p className="text-white font-bold">your referral link</p>

          <div className="w-[349px] h-[50px] bg-black flex justify-between items-center px-4">
            <p className="text-white font-bold">{referralCode}</p>

            <CopyToClipboard
              text={`https://cobogo.social/submit/connect?ref=${referralCode}`}
            >
              <IoCopySharp className="hover:cursor-pointer" color="white" />
            </CopyToClipboard>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-between items-center px-4">
        <div className="flex justify-center items-center">
          <div className="mr-4 flex">
            <Image
              src="/images/telegram-icon.svg"
              width={35}
              height={30}
              alt="telegram icon"
            />
          </div>

          <Link href="https://www.telegram.com/">
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-bold"
            >
              share on Telegram
            </a>
          </Link>
        </div>

        <div className="flex justify-center items-center">
          <div className="mr-4 flex">
            <Image
              src="/images/twitter-icon.svg"
              width={38}
              height={30}
              alt="telegram icon"
            />
          </div>

          <Link href="https://www.twitter.com/">
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-bold"
            >
              share on Twitter
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
