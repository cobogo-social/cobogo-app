import Image from 'next/image';

import ProfileService from './ProfileService';

export default function ProfileServices() {
  return (
    <div className="h-[652px] w-full hidden sm:flex flex-col items-center bg-gray7 py-[30px]">
      <div className="flex hover:cursor-pointer w-full px-[30px]">
        <Image
          src="/images/edit-icon.svg"
          width={21}
          height={19}
          alt="edit icon"
        />
      </div>

      <div className="flex flex-col justify-between items-start w-full px-[155px]">
        <p className="text-[22px] mb-[20px]">services offered</p>

        <div className="flex w-full justify-between">
          <ProfileService />

          <ProfileService />

          <ProfileService />
        </div>
      </div>
    </div>
  );
}
