import Image from 'next/image';

export default function WhitelistedNotification() {
  return (
    <div className="flex h-[60px] justify-center items-center mb-8">
      <div className="w-[60px] h-[60px] sm:border-l-4 border-gray5 flex justify-center items-center">
        <Image
          src="/images/notification-icon.svg"
          width={18}
          height={20}
          alt="notification icon"
        />
      </div>

      <p className="sm:w-[369px] font-bold text-xs sm:text-base">
        you will be notified via the email registered on your YouTube account.
      </p>
    </div>
  );
}
