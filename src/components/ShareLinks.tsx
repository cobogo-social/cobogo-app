import Image from 'next/image';

interface ShareLinksProps {
  referralCode: string;
}

export default function ShareLinks({ referralCode }: ShareLinksProps) {
  return (
    <div className="w-full flex flex-col sm:flex-row justify-between items-center">
      <div className="flex justify-center items-center mb-4 sm:mb-0">
        <div className="mr-4 flex">
          <Image
            src="/images/telegram-icon.svg"
            width={35}
            height={30}
            alt="telegram icon"
          />
        </div>

        <a
          href={`https://t.me/share/url?url=app.cobogo.social/submit?ref=${referralCode}&text=Hi! cobogo is a dapp that helps YouTubers fund themselves sustainably through their communities using blockchain. Use my referral link when you sign up for free for the waitlist, and we both get rewards!`}
          className="text-white font-bold"
          target="_blank"
          rel="noopener noreferrer"
        >
          share on Telegram
        </a>
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

        <a
          href={`https://twitter.com/intent/tweet?text=Hi!%20cobogo%20is%20a%20dapp%20that%20helps%20YouTubers%20fund%20themselves%20sustainably%20through%20their%20communities%20using%20blockchain.%20Use%20my%20referral%20link%20when%20you%20sign%20up%20for%20free%20for%20the%20waitlist,%20and%20we%20both%20get%20rewards!%0Aapp.cobogo.social/submit?ref=${referralCode}`}
          className="text-white font-bold"
          target="_blank"
          rel="noopener noreferrer"
        >
          share on Twitter
        </a>
      </div>
    </div>
  );
}
