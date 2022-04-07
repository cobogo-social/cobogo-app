import Image from 'next/image';

interface BlankslateShareLinksProps {
  referralCode: string;
}

export default function BlankslateShareLinks({
  referralCode,
}: BlankslateShareLinksProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full sm:flex-row">
      <div className="flex items-center justify-center mb-4 sm:mb-0">
        <div className="flex mr-4">
          <Image
            src="/images/telegram-icon.svg"
            width={35}
            height={30}
            alt="telegram icon"
          />
        </div>

        <a
          href={`https://t.me/share/url?url=app.cobogo.social/submit?ref=${referralCode}&text=Hi! cobogo is a dapp that helps YouTubers fund themselves sustainably through their communities using blockchain. Use my referral link when you sign up for free for the waitlist, and we both get rewards!`}
          className="font-bold sm:mr-[85px]"
          target="_blank"
          rel="noopener noreferrer"
        >
          share on Telegram
        </a>
      </div>

      <div className="flex items-center justify-center">
        <div className="flex mr-4">
          <Image
            src="/images/twitter-icon.svg"
            width={38}
            height={30}
            alt="telegram icon"
          />
        </div>

        <a
          href={`https://twitter.com/intent/tweet?text=Hi!%20cobogo%20is%20a%20dapp%20that%20helps%20YouTubers%20fund%20themselves%20sustainably%20through%20their%20communities%20using%20blockchain.%20Use%20my%20referral%20link%20when%20you%20sign%20up%20for%20free%20for%20the%20waitlist,%20and%20we%20both%20get%20rewards!%0Aapp.cobogo.social/submit?ref=${referralCode}`}
          className="font-bold"
          target="_blank"
          rel="noopener noreferrer"
        >
          share on Twitter
        </a>
      </div>
    </div>
  );
}
