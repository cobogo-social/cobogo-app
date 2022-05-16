import Link from './Link';

export default function Earn1000CBGNotification() {
  return (
    <div className="flex h-[60px] justify-start items-center mb-[20px]">
      <div className="w-[30px] h-[60px] border-l-4 border-gray3 hidden sm:flex justify-center items-center" />

      <div>
        <p className="sm:w-[326px] font-bold text-xs sm:text-base">
          want to earn 1,000 more CBG tokens?
        </p>

        <Link href="/submit/video">
          <button className="sm:w-[326px] font-bold text-xs sm:text-base text-blue flex">
            find out how
          </button>
        </Link>
      </div>
    </div>
  );
}
