import Image from 'next/image';

interface MediaKitAnalyticsDistributionsCountryProps {
  audienceTopCountries1: number;
  audienceTopCountries2: number;
  audienceTopCountries3: number;
}

export default function MediaKitAnalyticsDistributionsCountry({
  audienceTopCountries1,
  audienceTopCountries2,
  audienceTopCountries3,
}: MediaKitAnalyticsDistributionsCountryProps) {
  return (
    <div className="relative">
      <div className="h-full absolute flex justify-center items-center left-[-10px]">
        <div className="bg-black py-[10px]">
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
            <div className="w-[138px] h-[7px] bg-gray10 mr-[15px]">
              <div
                style={{
                  width: `${audienceTopCountries1}%`,
                }}
                className="h-full bg-purple2"
              />
            </div>

            <p className="font-bold text-[23px]">{audienceTopCountries1}%</p>
          </div>

          <div className="flex items-center">
            <div className="w-[138px] h-[7px] bg-gray10 mr-[15px]">
              <div
                style={{
                  width: `${audienceTopCountries2}%`,
                }}
                className="h-full bg-pink"
              />
            </div>

            <p className="font-bold text-[23px]">{audienceTopCountries2}%</p>
          </div>

          <div className="flex items-center">
            <div className="w-[138px] h-[7px] bg-gray10 mr-[15px]">
              <div
                style={{
                  width: `${audienceTopCountries3}%`,
                }}
                className="w-[55%] h-full bg-violet"
              />
            </div>

            <p className="font-bold text-[23px]">{audienceTopCountries3}%</p>
          </div>

          <div className="flex items-center">
            <div className="bg-purple2 w-[7px] h-[7px] mr-1" />

            <p className="text-gray6 font-bold mr-[12px]">US</p>

            <div className="bg-pink w-[7px] h-[7px] mr-1" />

            <p className="text-gray6 font-bold mr-[12px]">UK</p>

            <div className="bg-violet w-[7px] h-[7px] mr-1" />

            <p className="text-gray6 font-bold mr-[12px]">BR</p>
          </div>
        </div>
      </div>
    </div>
  );
}
