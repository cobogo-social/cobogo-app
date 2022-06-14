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
  isOwner: boolean;
  openEditDistributionsModal: () => void;
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
  isOwner,
  openEditDistributionsModal,
}: ProfileMediaKitAnalyticsProps) {
  return (
    <div className="h-[348px] w-full hidden sm:flex flex-col items-center relative justify-center py-[70px] px-[150px] bg-black">
      {isOwner && (
        <div
          onClick={openEditDistributionsModal}
          className="flex hover:cursor-pointer absolute top-[30px] left-[30px]"
        >
          <Image
            src="/images/edit-icon.svg"
            width={21}
            height={19}
            alt="edit icon"
          />
        </div>
      )}

      <div className="flex justify-between items-end w-full px-[155px]">
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
    </div>
  );
}
