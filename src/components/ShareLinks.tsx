import ButtonWithIcon from '@components/ButtonWithIcon';

interface ShareLinksProps {
  referralCode: string;
}

export default function ShareLinks({ referralCode }: ShareLinksProps) {
  return (
    <div className="flex flex-col justify-center items-start">
      <a
        href={`https://t.me/share/url?url=app.cobogo.social/submit?ref=${referralCode}&text=Hi! cobogo is a dapp that helps YouTubers fund themselves sustainably through their communities using blockchain. Use my referral link when you sign up for free for the waitlist, and we both get rewards!`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <ButtonWithIcon
          color="bg-bluetelegram"
          icon="/images/telegram-icon.svg"
          text="share on Telegram"
        />
      </a>
    </div>
  );
}
