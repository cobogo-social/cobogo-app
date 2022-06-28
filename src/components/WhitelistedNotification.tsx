import Image from 'next/image';

export default function WhitelistedNotification() {
  return (
    <div className="flex h-[60px] justify-center items-center mb-10 gap-5">
      <div className="h-[60px] sm:border-l-4 border-gray5 hidden sm:flex" />

      <div className="hidden sm:flex">
        <Image
          src="/images/notification-icon.svg"
          width={18}
          height={20}
          alt="notification icon"
        />
      </div>

      <p className="max-w-[369px] font-bold">
        you will be notified via the email registered on your YouTube account.
      </p>
    </div>
  );
}
