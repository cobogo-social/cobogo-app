import SidebarContainer from '@components/containers/SidebarContainer';
import EditMediaKitAnalyticsForm from '@components/forms/EditMediaKitAnalyticsForm';
import Image from 'next/image';
import { useEffect } from 'react';

interface EditMediaKitAnalyticsSidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
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
        audienceAgeDistribution35={props.audienceAgeDistribution35}
        audienceTopCountries1={props.audienceTopCountries1}
        audienceTopCountries2={props.audienceTopCountries2}
        audienceTopCountries3={props.audienceTopCountries3}
        audienceGenderDistributionMen={props.audienceGenderDistributionMen}
        audienceGenderDistributionWomen={props.audienceGenderDistributionWomen}
        audienceGenderDistributionOthers={
          props.audienceGenderDistributionOthers
        }
        handle={props.handle}
        closeModal={closeModal}
      />
    </SidebarContainer>
  ) : null;
}
