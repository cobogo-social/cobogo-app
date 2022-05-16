export default function WaitlistNotification() {
  return (
    <div className="flex h-[60px] justify-start items-center mb-[20px]">
      <div className="w-[30px] h-[60px] sm:border-l-4 border-green flex justify-center items-center" />

      <div>
        <p className="sm:w-[326px] font-bold text-xs sm:text-base">
          join whitelist and earn 100 CBG tokens
        </p>

        <p className="sm:w-[326px] font-bold text-xs sm:text-base text-green">
          done
        </p>
      </div>
    </div>
  );
}
