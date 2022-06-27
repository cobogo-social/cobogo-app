import Image from 'next/image';

import Distribution from './Distribution';

interface MediaKitAnalyticsProps {
  audienceGenderDistributionMen: number;
  audienceGenderDistributionWomen: number;
  audienceGenderDistributionOthers: number;
  audienceGenderDistribution18: number;
  audienceGenderDistribution2534: number;
  audienceGenderDistribution35: number;
  audienceTopCountries1: number;
  audienceTopCountries2: number;
  audienceTopCountries3: number;
  isOwner: boolean;
}

export default function MediaKitAnalytics(props: MediaKitAnalyticsProps) {
  return (
    <div className="w-full flex items-center relative justify-center py-[70px] px-[150px] bg-black">
      {props.isOwner && (
        <div className="flex hover:cursor-pointer absolute top-[30px] left-[30px]">
          <Image
            src="/images/edit-icon.svg"
            width={30}
            height={28}
            alt="edit icon"
          />
        </div>
      )}

      <div className="flex max-w-[1000px] w-full gap-10 justify-start items-center">
        <Distribution
          percent1={props.audienceGenderDistributionMen}
          percent2={props.audienceGenderDistributionWomen}
          percent3={props.audienceGenderDistributionOthers}
          placeholder1="men"
          placeholder2="women"
          placeholder3="others"
          title="gender distribution"
          icon={
            <Image
              src="/images/gender-icon.svg"
              width={45}
              height={45}
              alt="gender icon"
            />
          }
          iconPosition="left-[-25px]"
        />

        <Distribution
          percent1={props.audienceGenderDistribution18}
          percent2={props.audienceGenderDistribution2534}
          percent3={props.audienceGenderDistribution35}
          placeholder1="-18"
          placeholder2="18-34"
          placeholder3="+35"
          title="age distribution"
          icon={
            <Image
              src="/images/bar-chart-icon.svg"
              width={39}
              height={39}
              alt="bar chart icon"
            />
          }
          iconPosition="left-[-20px]"
        />

        <Distribution
          percent1={props.audienceTopCountries1}
          percent2={props.audienceTopCountries2}
          percent3={props.audienceTopCountries3}
          placeholder1="-"
          placeholder2="-"
          placeholder3="-"
          title="top countries"
          icon={
            <Image
              src="/images/location-icon.svg"
              width={22}
              height={31}
              alt="location icon"
            />
          }
          iconPosition="left-[-10px]"
        />
      </div>
    </div>
  );
}
