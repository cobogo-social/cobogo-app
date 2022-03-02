import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { IoCopySharp } from 'react-icons/io5';

import Button from './Button';
import ChannelBanner from './ChannelBanner';
import TopBar from './TopBar';

interface InviteProps {
  banner: string;
  title: string;
  description: string;
  referralCode: string;
}

export default function Invite({
  banner,
  title,
  description,
  referralCode,
}: InviteProps) {
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
    <>
      <div className="bg-primary w-full h-screen sm:h-full p-8">
        <TopBar />

        <div className="flex flex-row justify-between items-start px-16 2xl:px-64">
          <div className="flex flex-col">
            <p className="text-4xl text-white">invite your friends</p>
            <p className="text-4xl text-white mb-4">
              and <span className="font-bold">get valuable rewards!</span>
            </p>

            <p className="text-base sm:text-lg text-white mb-8">
              earn more CBG for each Creator that joins the waitlist.
            </p>

            <div className="flex justify-between items-center mb-2">
              <p className="text-lg text-white font-bold">your referral link</p>
              <div className="flex justify-center items-center">
                <p className="text-white mr-2">accepted: </p>
                <span className="text-blue font-bold">{acceptedLength}</span>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="px-4 h-12 bg-secondary hidden sm:flex justify-center items-center border-[1.5px] border-r-0 border-details">
                <p className="text-white font-bold">
                  https://app.cobogo.social/submit?ref={referralCode}
                </p>
              </div>

              <div className="relative">
                <div
                  className={`px-4 h-12 bg-black border-[1.5px] border-l-0 border-details mb-8 outline-none flex justify-center items-center`}
                >
                  <CopyToClipboard
                    text={`Hi! cobogo is a dapp that helps us fund ourselves sustainably using blockchain. Use my referral link when you sign up for free for the waitlist, and we both get rewards!
                    localhost:3000/submit?ref=${referralCode}`}
                  >
                    <IoCopySharp
                      className="hover:cursor-pointer"
                      color="white"
                    />
                  </CopyToClipboard>
                </div>
              </div>
            </div>

            <p className="text-white mb-8 text-lg">
              read{' '}
              <Link href="https://docs.cobogo.social/overview/getting-started/referral-program">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-blue"
                >
                  our docs
                </a>
              </Link>{' '}
              to learn more.
            </p>

            <div className="w-full flex justify-between items-center mb-8">
              <div className="flex justify-center items-center">
                <div className="mr-4 flex">
                  <Image
                    src="/images/telegram-icon.svg"
                    width={35}
                    height={30}
                    alt="telegram icon"
                  />
                </div>

                <Link
                  href={`https://t.me/share/url?url=localhost:3000/submit?ref=${referralCode}&text=Hi! cobogo is a dapp that helps us fund ourselves sustainably using blockchain. Use my referral link when you sign up for free for the waitlist, and we both get rewards!`}
                >
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

                <Link
                  href={`https://twitter.com/intent/tweet?text=Hi!%20cobogo%20is%20a%20dapp%20that%20helps%20us%20fund%20ourselves%20sustainably%20using%20blockchain.%20Use%20my%20referral%20link%20when%20you%20sign%20up%20for%20free%20for%20the%20waitlist,%20and%20we%20both%20get%20rewards!%0Alocalhost%3A3000/submit?ref=${referralCode}`}
                >
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

            <Link href="/submit/success">
              <Button
                width="w-32"
                height="h-9"
                color="bg-blue"
                hoverColor="brightness-90"
                text="next step"
              />
            </Link>
          </div>

          <ChannelBanner
            banner={banner}
            title={title}
            description={description}
          />
        </div>
      </div>
    </>
  );
}
