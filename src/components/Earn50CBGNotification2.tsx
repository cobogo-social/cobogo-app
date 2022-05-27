import Link from './Link';

interface Earn50CBGNotification2Props {
  handle: string;
}

export default function Earn50CBGNotification2({
  handle,
}: Earn50CBGNotification2Props) {
  return (
    <div className="flex h-[60px] justify-start items-center mb-[20px]">
      <div
        className={`w-[30px] h-[60px] border-l-4
          border-gray9 hidden sm:flex justify-center items-center`}
      />

      <div>
        <p className="sm:w-[413px] font-bold text-xs sm:text-base">
          earn 50 more CBG tokens completing your profile
        </p>

        <Link href={`/${handle}`}>
          <button className="sm:w-[387px] font-bold text-xs sm:text-base text-blue flex">
            view profile
          </button>
        </Link>
      </div>
    </div>
  );
}
