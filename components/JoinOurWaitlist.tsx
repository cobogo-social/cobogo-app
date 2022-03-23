import Image from 'next/image';

export default function JoinOurWaitlist() {
  return (
    <div className="sm:[572px] h-[130px] bg-secondary hidden sm:flex justify-center items-center p-4 mb-8">
      <div className="flex mr-2">
        <Image src="/images/100-cbg-icon.svg" width={108} height={108} />
      </div>

      <p className="text-white">
        join our waitlist to be the first in this revolutionary economy, and to
        earn <span className="font-bold">100 CBG</span> tokens.
      </p>
    </div>
  );
}
