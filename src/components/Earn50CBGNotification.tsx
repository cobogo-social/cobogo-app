interface Earn50CBGNotificationProps {
  referralCode: string;
}

export default function Earn50CBGNotification({
  referralCode,
}: Earn50CBGNotificationProps) {
  return (
    <div className="flex h-[130px] justify-start items-center mb-8">
      <div className="w-[30px] h-[130px] sm:border-l-4 border-gray3 flex justify-center items-center" />

      <div>
        <p className="sm:w-[326px] font-bold text-xs sm:text-base">
          earn 50 more CBG tokens for each Creator whitelisted using your
          referral link
        </p>

        <p className="sm:w-[326px] font-bold text-xs sm:text-base text-blue">
          <p className="text-xs font-bold text-blue sm:text-sm">
            app.cobogo.social/submit?ref={referralCode}
          </p>
        </p>

        <a
          href="https://docs.cobogo.social/youtubers/referral-program"
          target="_blank"
          rel="noopener noreferrer"
          className="sm:w-[326px] font-bold text-xs sm:text-base text-gray3"
        >
          learn more
        </a>
      </div>
    </div>
  );
}
