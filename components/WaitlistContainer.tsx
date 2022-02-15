import Image from 'next/image';

interface WaitlistContainerProps {
  title: string;
}

export default function WaitlistContainer({ title }: WaitlistContainerProps) {
  return (
    <div className="flex flex-col">
      <p className="text-4xl text-white mb-4">waitlist</p>
      <p className="text-xl text-white w-[408px] mb-12">
        <span className="font-bold">cobogo</span> is a dApp still in
        development, but The channel <span className="font-bold">{title}</span>{' '}
        has been added to the waitlist.
      </p>

      <div className="flex h-[60px] justify-center items-center">
        <div className="w-[60px] h-[60px] border-l-4 border-details flex justify-center items-center">
          <div className="">
            <Image
              src="/images/notification-icon.svg"
              width={18}
              height={20}
              alt="notification icon"
            />
          </div>
        </div>
        <p className=" w-[369px] font-bold text-white">
          you will be notified via the email registered on your YouTube account.
        </p>
      </div>
    </div>
  );
}
