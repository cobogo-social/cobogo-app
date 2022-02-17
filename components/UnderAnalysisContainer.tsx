import Image from 'next/image';

export default function UnderAnalysisContainer() {
  return (
    <div className="flex flex-col">
      <p className="text-4xl text-yellow mb-4">under analysis</p>

      <p className="text-xl text-white w-[408px] mb-12">
        the channel <span className="font-bold">Space Official</span>{' '}
        {`is already under analysis. In the next 48
    hours, our team will verify if your channel follows our rules and if
    it doesn't have any offensive content.`}
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
