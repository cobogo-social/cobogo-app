import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { IoCopySharp } from 'react-icons/io5';

import Button from './Button';
import ChannelBanner from './ChannelBanner';
import StepWrapper from './StepWrapper';
import TopBar from './TopBar';

interface InviteProps {
  banner: string;
  title: string;
  description: string;
  referralCode: string;
  email: string;
}

export default function Invite({
  banner,
  title,
  description,
  referralCode,
  email,
}: InviteProps) {
  return (
    <>
      <div className="bg-primary w-full h-screen sm:h-full p-8">
        <TopBar email={email} />

        <StepWrapper>
          <div className="flex flex-col">
            <p className="text-4xl text-white mb-4">congrats!</p>

            <p className="text-base sm:text-lg text-white mb-8 sm:w-[408px]">
              you are now on the waitlist and eligible to earn{' '}
              <span className="font-bold">100 CBG</span> tokens, which is equal
              to <span className="font-bold">$60</span> in the public sale!
            </p>

            <p className="text-xs sm:text-sm text-white mb-8 sm:w-[408px]">
              you can earn more <span className="font-bold">50 CBG</span> for
              each Creator that joins the waitlist using your referral link, an
              they will earn rewards too.
            </p>

            <div className="flex justify-center mb-8">
              <div className="px-4 h-[90px] bg-secondary flex justify-center items-center border-[1.5px] border-details">
                <p className="font-bold text-white mr-2">your referral link</p>

                <div className="px-4 h-[50px] bg-black flex justify-center items-center border-[1.5px] border-r-0 border-details">
                  <p className="text-blue font-bold text-xs sm:text-sm">
                    https://app.cobogo.social/submit?ref={referralCode}
                  </p>
                </div>

                <div
                  className={`px-4 h-[50px] bg-black border-[1.5px] border-l-0 border-details outline-none flex justify-center items-center`}
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

            <p className="text-white mb-8 text-lg">
              <Link href="https://docs.cobogo.social/overview/getting-started/referral-program">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-blue"
                >
                  learn more
                </a>
              </Link>{' '}
              about our <span className="font-bold">Referral Program.</span>
            </p>

            <Link href="/submit/success">
              <Button
                width="w-40"
                height="h-9"
                color="bg-blue"
                hoverColor="brightness-90"
                text="skip"
              />
            </Link>
          </div>

          <ChannelBanner
            banner={banner}
            title={title}
            description={description}
          />
        </StepWrapper>
      </div>
    </>
  );
}
