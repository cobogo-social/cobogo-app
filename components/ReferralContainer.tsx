import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { IoCopySharp } from 'react-icons/io5';

interface ReferralContainerProps {
  referralCode: string;
}

export default function ReferralContainer({
  referralCode,
}: ReferralContainerProps) {
  const [acceptedLength, setAcceptedLength] = useState();

  useEffect(() => {
    axios
      .get('/api/cobogo/readProfileByReferralCodeUsed', {
        params: {
          referral_code_used: referralCode,
        },
      })
      .then((response) => setAcceptedLength(response.data.data.length));
  }, []);

  return (
    <div>
      <div className="w-[431px] h-[390px] bg-secondary flex flex-col justify-between mb-12">
        <div className="flex justify-between items-center px-8 pt-8">
          <div>
            <p className="text-xl text-white">invite your friends</p>

            <p className="text-xl text-white mb-4">
              and <span className="font-bold">get valuable rewards!</span>
            </p>

            <p className="text-white">
              complete the process and earn more for each Creator that joins the
              waitlist.
            </p>
          </div>
        </div>

        <div className="px-8">
          <div className="flex justify-between mb-2">
            <p className="text-white font-bold">your referral link</p>

            <div className="flex">
              <p className="text-white mr-2">accepted: </p>
              <span className="text-blue font-bold">{acceptedLength}</span>
            </div>
          </div>

          <div className="w-[365px] h-[50px] bg-black flex justify-between items-center px-4">
            <p className="text-white font-bold">{referralCode}</p>

            <CopyToClipboard
              text={`http://localhost:3000/submit/connect?ref=${referralCode}`}
            >
              <IoCopySharp className="hover:cursor-pointer" color="white" />
            </CopyToClipboard>
          </div>
        </div>

        <div className="w-full h-[73px] bg-details flex px-8 justify-start items-center">
          <p className="text-white">
            read <span className="font-bold text-blue">our docs</span> to learn
            more.
          </p>
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
