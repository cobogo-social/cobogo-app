import Link from './Link';

export default function Earn50CBGNotification() {
  return (
    <div className="flex h-[130px] justify-start items-center mb-8">
      <div className="w-[30px] h-[130px] border-l-4 border-gray9 hidden sm:flex justify-center items-center" />

      <div>
        <p className="sm:w-[326px] font-bold text-xs sm:text-base">
          earn 50 more CBG tokens for each Creator whitelisted using your
          referral link
        </p>

        <Link href="/referral-dashboard">
          <button className="sm:w-[326px] font-bold text-xs sm:text-base text-blue flex">
            find out how
          </button>
        </Link>
      </div>
    </div>
  );
}
