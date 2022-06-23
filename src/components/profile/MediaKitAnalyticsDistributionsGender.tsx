import Image from 'next/image';

interface MediaKitAnalyticsDistributionsGenderProps {
  audienceGenderDistributionMen: number;
  audienceGenderDistributionWomen: number;
}

export default function MediaKitAnalyticsDistributionsGender({
  audienceGenderDistributionMen,
  audienceGenderDistributionWomen,
}: MediaKitAnalyticsDistributionsGenderProps) {
  return (
    <div className="relative">
      <div className="h-full absolute flex justify-center items-center left-[-20px]">
        <div className="bg-black py-[10px]">
          <Image
            src="/images/gender-icon.svg"
            width={45}
            height={45}
            alt="gender icon"
          />
        </div>
      </div>

      <div className="w-[296px] h-[207px] border-[1px] border-gray10 flex flex-col justify-center items-center px-[30px]">
        <div>
          <p className="font-bold">gender distribution</p>

          <div className="flex items-center">
            <div className="w-[138px] h-[7px] bg-gray10 mr-[15px]">
              <div
                style={{
                  width: `${audienceGenderDistributionMen}%`,
                }}
                className="h-full bg-purple2"
              />
            </div>

            <p className="font-bold text-[30px]">
              {audienceGenderDistributionMen}%
            </p>
          </div>

          <div className="flex items-center">
            <div className="w-[138px] h-[7px] bg-gray10 mr-[15px]">
              <div
                style={{
                  width: `${audienceGenderDistributionWomen}%`,
                }}
                className="h-full bg-pink"
              />
            </div>

            <p className="font-bold text-[30px]">
              {audienceGenderDistributionWomen}%
            </p>
          </div>

          <div className="flex items-center">
            <div className="bg-purple2 w-[7px] h-[7px] mr-1" />

            <p className="text-gray6 font-bold mr-[12px]">men</p>

            <div className="bg-pink w-[7px] h-[7px] mr-1" />

            <p className="text-gray6 font-bold">women</p>
          </div>
        </div>
      </div>
    </div>
  );
}
