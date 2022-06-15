import Image from 'next/image';

import ProfileMediaKitAnalyticsDistributionsAge from './ProfileMediaKitAnalyticsDistributionsAge';
import ProfileMediaKitAnalyticsDistributionsCountry from './ProfileMediaKitAnalyticsDistributionsCountry';
import ProfileMediaKitAnalyticsDistributionsGender from './ProfileMediaKitAnalyticsDistributionsGender';

interface ProfileMediaKitAnalyticsProps {
  audienceGenderDistributionMen: number;
  audienceGenderDistributionWomen: number;
  audienceGenderDistribution18: number;
  audienceGenderDistribution2534: number;
  audienceGenderDistribution35: number;
  audienceTopCountries1: number;
  audienceTopCountries2: number;
  audienceTopCountries3: number;
}

export default function ProfileMediaKitAnalytics({
  audienceGenderDistributionMen,
  audienceGenderDistributionWomen,
  audienceGenderDistribution18,
  audienceGenderDistribution2534,
  audienceGenderDistribution35,
  audienceTopCountries1,
  audienceTopCountries2,
  audienceTopCountries3,
}: ProfileMediaKitAnalyticsProps) {
  return (
    <div className="w-full flex items-center relative justify-between py-[70px] px-[150px] bg-black">
      <div className="flex hover:cursor-pointer absolute top-[30px] left-[30px]">
        <Image
          src="/images/edit-icon.svg"
          width={30}
          height={28}
          alt="edit icon"
        />
      </div>

      <ProfileMediaKitAnalyticsDistributionsGender
        audienceGenderDistributionMen={audienceGenderDistributionMen}
        audienceGenderDistributionWomen={audienceGenderDistributionWomen}
      />

      <ProfileMediaKitAnalyticsDistributionsAge
        audienceGenderDistribution18={audienceGenderDistribution18}
        audienceGenderDistribution2534={audienceGenderDistribution2534}
        audienceGenderDistribution35={audienceGenderDistribution35}
      />

      <ProfileMediaKitAnalyticsDistributionsCountry
        audienceTopCountries1={audienceTopCountries1}
        audienceTopCountries2={audienceTopCountries2}
        audienceTopCountries3={audienceTopCountries3}
      />
    </div>
  );
}
