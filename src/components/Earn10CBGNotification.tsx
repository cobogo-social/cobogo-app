interface Earn10CBGNotificationProps {
  referralCode: string;
}

export default function Earn10CBGNotification({
  referralCode,
}: Earn10CBGNotificationProps) {
  return (
    <div className="flex h-[60px] justify-start items-center mb-[20px]">
      <div
        className={`w-[30px] h-[60px] border-l-4
          border-gray9 hidden sm:flex justify-center items-center`}
      />

      <div>
        <p className="sm:w-[374px] font-bold text-xs sm:text-base">
          earn 10 more CBG tokens by sharing on Twitter
        </p>

        <a
          target="_blank"
          href={`https://twitter.com/intent/tweet?text=Check%20this%20out!%20%0A%0A@cobogosocial%20is%20a%20dapp%20that%20helps%20YouTubers%20monetize%20themselves%20sustainably%20through%20their%20communities%20using%20blockchain.%20%0A%0AUse%20my%20referral%20link%20when%20you%20sign%20up%20for%20free%20for%20the%20whitelist,%20and%20we%20both%20get%20rewards!%0Aapp.cobogo.social/submit?ref=${referralCode}`}
          className="sm:w-[326px] font-bold text-xs sm:text-base text-blue flex"
          rel="noreferrer"
        >
          share on Twitter
        </a>
      </div>
    </div>
  );
}
