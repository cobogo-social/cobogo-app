import ButtonWithIcon from '@components/buttons/ButtonWithIcon';

interface ShareLinksProps {
  referralCode: string;
}

export default function ShareLinks({ referralCode }: ShareLinksProps) {
  return (
    <div className="flex flex-col justify-center items-start">
      <a
        href={`https://t.me/share/url?url=app.cobogo.social/submit?ref=${referralCode}&text=Hi! cobogo is a dapp that helps YouTubers fund themselves sustainably through their communities using blockchain. Use my referral link when you sign up for free for the waitlist, and we both get rewards!`}
        className="mb-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ButtonWithIcon
          color="bg-bluetelegram"
          icon="/images/telegram-icon.svg"
          text="share on Telegram"
        />
      </a>

      <a
        href={`https://twitter.com/intent/tweet?text=Hi!%20cobogo%20is%20a%20dapp%20that%20helps%20YouTubers%20fund%20themselves%20sustainably%20through%20their%20communities%20using%20blockchain.%20Use%20my%20referral%20link%20when%20you%20sign%20up%20for%20free%20for%20the%20waitlist,%20and%20we%20both%20get%20rewards!%0Aapp.cobogo.social/submit?ref=${referralCode}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <ButtonWithIcon
          color="bg-bluetwitter"
          icon="/images/twitter-icon.svg"
          text="share on Twitter"
        />
      </a>
    </div>
  );
}
