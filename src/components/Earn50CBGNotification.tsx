import Link from './Link';

export default function Earn50CBGNotification() {
  return (
    <div className="flex h-[99px] justify-start items-center mb-[20px]">
      <div className="w-[30px] h-[99px] border-l-4 border-gray9 hidden sm:flex justify-center items-center" />

      <div>
        <p className="sm:w-[326px] font-bold text-xs sm:text-base">
          earn 50 more CBG tokens for each Creator whitelisted using your
          referral link
        </p>

        <Link href="/referral-dashboard">
          <button className="sm:w-[326px] font-bold text-xs sm:text-base text-blue flex">
            view referral link
          </button>
        </Link>
      </div>
    </div>
  );
}
