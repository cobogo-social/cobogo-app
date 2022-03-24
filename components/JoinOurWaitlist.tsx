import Image from 'next/image';

export default function JoinOurWaitlist() {
  return (
    <div className="sm:[572px] sm:h-[130px] bg-secondary flex flex-col sm:flex-row justify-center items-center px-4 py-6 mb-16">
      <div className="hidden sm:flex mr-2">
        <Image src="/images/100-cbg-icon.svg" width={108} height={108} />
      </div>

      <div className="flex sm:hidden mr-2">
        <Image src="/images/100-cbg-icon.svg" width={79} height={79} />
      </div>

      <p className="text-white text-center sm:text-left">
        join our waitlist to be the first in this revolutionary economy, and to
        earn <span className="font-bold">100 CBG</span> tokens.
      </p>
    </div>
  );
}
