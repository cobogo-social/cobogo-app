import Image from 'next/image';

import ProfileDistributionsAge from './ProfileDistributionsAge';
import ProfileDistributionsCountry from './ProfileDistributionsCountry';
import ProfileDistributionsGender from './ProfileDistributionsGender';

export default function ProfileDistributions() {
  return (
    <div className="h-[348px] w-full hidden sm:flex flex-col items-center py-[30px]">
      <div className="flex hover:cursor-pointer w-full px-[30px]">
        <Image
          src="/images/edit-icon.svg"
          width={21}
          height={19}
          alt="edit icon"
        />
      </div>

      <div className="flex justify-between items-end w-full px-[155px]">
        <ProfileDistributionsGender />

        <ProfileDistributionsAge />

        <ProfileDistributionsCountry />
      </div>
    </div>
  );
}
