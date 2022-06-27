import Image from 'next/image';

export default function JoinOurWaitlist() {
  return (
    <div className="sm:w-[572px] sm:h-[150px] bg-secondary flex flex-col sm:flex-row justify-start items-center p-7 mb-12">
      <div className="hidden sm:flex mr-8">
        <Image
          src="/images/purple-cbg-icon.png"
          width={87}
          height={77}
          alt="purple cbg icon"
        />
      </div>

      <div className="flex sm:hidden mr-2">
        <Image
          src="/images/100-cbg-icon.svg"
          width={79}
          height={79}
          alt="100 cbg icon"
        />
      </div>

      <p className="text-center sm:text-left max-w-[402px] text-lg">
        <span className="font-bold">join our whitelist</span> now and be one of
        the first to experience the new Creator Economy, while also earning the
        equivalent of <span className="font-bold">60 dollars</span> of our
        native token (<span className="font-bold">100 CBG</span>)!
      </p>
    </div>
  );
}
