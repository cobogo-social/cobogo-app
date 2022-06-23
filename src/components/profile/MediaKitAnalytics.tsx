import AgeIcon from '@components/icons/AgeIcon';
import GenderIcon from '@components/icons/GenderIcon';
import LocationIcon from '@components/icons/Location';
import Image from 'next/image';

import Distribution from './Distribution';

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
        <Distribution
          percent1={audienceGenderDistributionMen}
          percent2={audienceGenderDistributionWomen}
          placeholder1="men"
          placeholder2="women"
          title="gender distribution"
          icon={<GenderIcon size={45} />}
        />

        <Distribution
          percent1={audienceGenderDistribution18}
          percent2={audienceGenderDistribution2534}
          percent3={audienceGenderDistribution35}
          placeholder1="-18"
          placeholder2="18-34"
          placeholder3="+35"
          title="age distribution"
          icon={<AgeIcon />}
        />

        <Distribution
          percent1={audienceTopCountries1}
          percent2={audienceTopCountries2}
          percent3={audienceTopCountries3}
          placeholder1="US"
          placeholder2="BR"
          placeholder3="UK"
          title="top countries"
          icon={<LocationIcon size={22} />}
        />
      </div>
    </div>
  );
}
