import SidebarContainer from '@components/containers/SidebarContainer';
import EditMediaKitAnalyticsForm from '@components/forms/EditMediaKitAnalyticsForm';
import Image from 'next/image';
import { useEffect } from 'react';

interface EditMediaKitAnalyticsSidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  audienceGenderDistributionMen: number;
  audienceGenderDistributionWomen: number;
  audienceAgeDistribution18: number;
  audienceAgeDistribution2534: number;
  audienceTopCountries1: number;
  audienceTopCountries2: number;
  handle: string;
  countries: string[];
  country1Name: string;
  country2Name: string;
  country3Name: string;
  country1Id: number;
  country2Id: number;
  country3Id: number;
}

export default function EditMediaKitAnalyticsSidebar(
  props: EditMediaKitAnalyticsSidebarProps,
) {
  function closeModal() {
    props.setOpen(false);
  }

  useEffect(() => {
    if (props.open) {
      document.body.classList.add('active-modal');
    } else {
      document.body.classList.remove('active-modal');
    }
  }, [props.open]);

  return props.open ? (
    <SidebarContainer>
      <div
        onClick={closeModal}
        className="absolute top-0 right-0 mt-[20px] mr-[20px] hover:cursor-pointer"
      >
        <Image src="/images/x2-icon.svg" width={13} height={13} alt="x2 icon" />
      </div>

      <EditMediaKitAnalyticsForm
        buttonText="save"
        audienceAgeDistribution18={props.audienceAgeDistribution18}
        audienceAgeDistribution2534={props.audienceAgeDistribution2534}
        audienceTopCountries1={props.audienceTopCountries1}
        audienceTopCountries2={props.audienceTopCountries2}
        audienceGenderDistributionMen={props.audienceGenderDistributionMen}
        audienceGenderDistributionWomen={props.audienceGenderDistributionWomen}
        handle={props.handle}
        closeModal={closeModal}
        countries={props.countries}
        country1Name={props.country1Name}
        country2Name={props.country2Name}
        country3Name={props.country3Name}
        country1Id={props.country1Id}
        country2Id={props.country2Id}
        country3Id={props.country3Id}
      />
    </SidebarContainer>
  ) : null;
}
