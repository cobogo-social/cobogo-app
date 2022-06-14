import Image from 'next/image';

interface ProfileMediaKitAnalyticsDistributionsAgeProps {
  audienceGenderDistribution18: number;
  audienceGenderDistribution2534: number;
  audienceGenderDistribution35: number;
}

export default function ProfileMediaKitAnalyticsDistributionsAge({
  audienceGenderDistribution18,
  audienceGenderDistribution2534,
  audienceGenderDistribution35,
}: ProfileMediaKitAnalyticsDistributionsAgeProps) {
  return (
    <div className="relative">
      <div className="h-full absolute flex justify-center items-center left-[-20px]">
        <div className="bg-black py-[10px]">
          <Image
            src="/images/age-icon.svg"
            width={39}
            height={39}
            alt="age icon"
          />
        </div>
      </div>

      <div className="w-[296px] h-[207px] border-[1px] border-gray10 flex flex-col justify-center items-center px-[30px]">
        <div>
          <p className="font-bold">age distribution</p>

          <div className="flex items-center">
            <div className="w-[138px] h-[7px] bg-gray11 mr-[15px]">
              <div
                style={{
                  width: `${audienceGenderDistribution18}%`,
                }}
                className="h-full bg-purple2"
              />
            </div>

            <p className="font-bold text-[23px]">
              {audienceGenderDistribution18}%
            </p>
          </div>

          <div className="flex items-center">
            <div className="w-[138px] h-[7px] bg-gray11 mr-[15px]">
              <div
                style={{
                  width: `${audienceGenderDistribution2534}%`,
                }}
                className="h-full bg-pink"
              />
            </div>

            <p className="font-bold text-[23px]">
              {audienceGenderDistribution2534}%
            </p>
          </div>

          <div className="flex items-center">
            <div className="w-[138px] h-[7px] bg-gray11 mr-[15px]">
              <div
                style={{
                  width: `${audienceGenderDistribution35}%`,
                }}
                className="h-full bg-violet"
              />
            </div>

            <p className="font-bold text-[23px]">
              {audienceGenderDistribution35}%
            </p>
          </div>

          <div className="flex items-center">
            <div className="bg-purple2 w-[7px] h-[7px] mr-1" />

            <p className="text-gray6 font-bold mr-[12px]">-18</p>

            <div className="bg-pink w-[7px] h-[7px] mr-1" />

            <p className="text-gray6 font-bold mr-[12px]">25-34</p>

            <div className="bg-violet w-[7px] h-[7px] mr-1" />

            <p className="text-gray6 font-bold mr-[12px]">+35</p>
          </div>
        </div>
      </div>
    </div>
  );
}
