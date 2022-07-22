import EditIcon from '@components/icons/EditIcon';
import EditMediaKitAnalyticsSidebar from '@components/sidebars/EditMediaKitAnalyticsSidebar';
import Image from 'next/image';
import { useState } from 'react';

import Distribution from './Distribution';

interface MediaKitAnalyticsProps {
  audienceGenderDistributionMen: number;
  audienceGenderDistributionWomen: number;
  audienceGenderDistributionOthers: number;
  audienceAgeDistribution18: number;
  audienceAgeDistribution2534: number;
  audienceAgeDistribution35: number;
  audienceTopCountries1: number;
  audienceTopCountries2: number;
  audienceTopCountries3: number;
  handle: string;
  isOwner: boolean;
  countries: string[];
  country1Name: string;
  country2Name: string;
  country3Name: string;
  country1Id: number;
  country2Id: number;
  country3Id: number;
}

export default function MediaKitAnalytics(props: MediaKitAnalyticsProps) {
  const [
    editMediaKitAnalyticsSidebarIsOpen,
    setEditMediaKitAnalyticsSidebarIsOpen,
  ] = useState(false);

  function openEditMediaKitAnalyticsSidebar() {
    setEditMediaKitAnalyticsSidebarIsOpen(true);
  }

  return (
    <>
      <EditMediaKitAnalyticsSidebar
        opened={editMediaKitAnalyticsSidebarIsOpen}
        setOpen={setEditMediaKitAnalyticsSidebarIsOpen}
        audienceAgeDistribution18={props.audienceAgeDistribution18}
        audienceAgeDistribution2534={props.audienceAgeDistribution2534}
        audienceTopCountries1={props.audienceTopCountries1}
        audienceTopCountries2={props.audienceTopCountries2}
        audienceGenderDistributionMen={props.audienceGenderDistributionMen}
        audienceGenderDistributionWomen={props.audienceGenderDistributionWomen}
        handle={props.handle}
        countries={props.countries}
        country1Name={props.country1Name}
        country2Name={props.country2Name}
        country3Name={props.country3Name}
        country1Id={props.country1Id}
        country2Id={props.country2Id}
        country3Id={props.country3Id}
      />

      <div className="w-full flex items-center relative justify-center px-5 sm:py-[70px] py-10 sm:px-[150px] bg-black">
        {props.isOwner && (
          <div
            onClick={openEditMediaKitAnalyticsSidebar}
            className="hidden sm:flex hover:cursor-pointer absolute top-[30px] left-[30px]"
          >
            <EditIcon size={30} />
          </div>
        )}

        <div className="flex flex-col sm:flex-row max-w-[1010px] w-full gap-10 justify-start items-center">
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
            percent1={props.audienceAgeDistribution18}
            percent2={props.audienceAgeDistribution2534}
            percent3={props.audienceAgeDistribution35}
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
            placeholder1={props.country1Name ? props.country1Name : '-'}
            placeholder2={props.country2Name ? props.country2Name : '-'}
            placeholder3={props.country3Name ? props.country3Name : '-'}
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
    </>
  );
}
