import Image from 'next/image';

import ProfileMediaKitAnalytics from './ProfileMediaKitAnalytics';
import ProfileMediaKitLinks from './ProfileMediaKitLinks';

export default function ProfileMediaKit() {
  return (
    <div className="h-[414px] w-full hidden sm:flex flex-col items-center bg-gray7 py-[30px]">
      <div className="flex hover:cursor-pointer w-full px-[30px]">
        <Image
          src="/images/edit-icon.svg"
          width={21}
          height={19}
          alt="edit icon"
        />
      </div>

      <div className="flex justify-between items-end w-full px-[155px]">
        <ProfileMediaKitAnalytics />

        <ProfileMediaKitLinks />
      </div>
    </div>
  );
}
