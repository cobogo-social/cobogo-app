import Image from 'next/image';

import MediaKitAnalyticsDistributionsAge from './MediaKitAnalyticsDistributionsAge';
import MediaKitAnalyticsDistributionsCountry from './MediaKitAnalyticsDistributionsCountry';
import MediaKitAnalyticsDistributionsGender from './MediaKitAnalyticsDistributionsGender';

interface MediaKitAnalyticsProps {
  audienceGenderDistributionMen: number;
  audienceGenderDistributionWomen: number;
  audienceGenderDistribution18: number;
  audienceGenderDistribution2534: number;
  audienceGenderDistribution35: number;
  audienceTopCountries1: number;
  audienceTopCountries2: number;
  audienceTopCountries3: number;
  isOwner: boolean;
}

export default function MediaKitAnalytics({
  audienceGenderDistributionMen,
  audienceGenderDistributionWomen,
  audienceGenderDistribution18,
  audienceGenderDistribution2534,
  audienceGenderDistribution35,
  audienceTopCountries1,
  audienceTopCountries2,
  audienceTopCountries3,
  isOwner,
}: MediaKitAnalyticsProps) {
  return (
    <div className="w-full flex items-center relative justify-center py-[70px] px-[150px] bg-black">
      {isOwner && (
        <div className="flex hover:cursor-pointer absolute top-[30px] left-[30px]">
          <Image
            src="/images/edit-icon.svg"
            width={30}
            height={28}
            alt="edit icon"
          />
        </div>
      )}

      <div className="flex max-w-[1000px] w-full justify-between items-center">
        <MediaKitAnalyticsDistributionsGender
          audienceGenderDistributionMen={audienceGenderDistributionMen}
          audienceGenderDistributionWomen={audienceGenderDistributionWomen}
        />

        <MediaKitAnalyticsDistributionsAge
          audienceGenderDistribution18={audienceGenderDistribution18}
          audienceGenderDistribution2534={audienceGenderDistribution2534}
          audienceGenderDistribution35={audienceGenderDistribution35}
        />

        <MediaKitAnalyticsDistributionsCountry
          audienceTopCountries1={audienceTopCountries1}
          audienceTopCountries2={audienceTopCountries2}
          audienceTopCountries3={audienceTopCountries3}
        />
      </div>
    </div>
  );
}
