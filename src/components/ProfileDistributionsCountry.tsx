import Image from 'next/image';

export default function ProfileDistributionsCountry() {
  return (
    <div className="relative">
      <div className="h-full absolute flex justify-center items-center left-[-10px]">
        <div className="bg-primary py-[10px]">
          <Image
            src="/images/country-icon.svg"
            width={22}
            height={31}
            alt="country icon"
          />
        </div>
      </div>

      <div className="w-[296px] h-[207px] border-[1px] border-gray10 flex flex-col justify-center items-center px-[30px]">
        <div>
          <p className="font-bold">top countries</p>

          <div className="flex items-center">
            <div className="w-[138px] h-[7px] bg-gray11 mr-[15px]">
              <div className="w-[10%] h-full bg-purple2" />
            </div>

            <p className="font-bold text-[23px]">10%</p>
          </div>

          <div className="flex items-center">
            <div className="w-[138px] h-[7px] bg-gray11 mr-[15px]">
              <div className="w-[35%] h-full bg-pink" />
            </div>

            <p className="font-bold text-[23px]">35%</p>
          </div>

          <div className="flex items-center">
            <div className="w-[138px] h-[7px] bg-gray11 mr-[15px]">
              <div className="w-[55%] h-full bg-violet" />
            </div>

            <p className="font-bold text-[23px]">55%</p>
          </div>

          <div className="flex items-center">
            <div className="bg-purple2 w-[7px] h-[7px] mr-1" />

            <p className="text-gray6 font-bold mr-[12px]">BR</p>

            <div className="bg-pink w-[7px] h-[7px] mr-1" />

            <p className="text-gray6 font-bold mr-[12px]">USA</p>

            <div className="bg-violet w-[7px] h-[7px] mr-1" />

            <p className="text-gray6 font-bold mr-[12px]">UK</p>
          </div>
        </div>
      </div>
    </div>
  );
}