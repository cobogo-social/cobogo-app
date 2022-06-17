import Image from 'next/image';

import ProfileService from './ProfileService';

interface ProfileServicesProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  services: any[];
}

export default function ProfileServices({ services }: ProfileServicesProps) {
  return (
    <div className="w-full hidden sm:flex flex-col items-center justify-start relative bg-gray7 py-[70px] px-[150px]">
      <div className="flex hover:cursor-pointer absolute top-[30px] left-[30px]">
        <Image
          src="/images/edit-icon.svg"
          width={30}
          height={28}
          alt="edit icon"
        />
      </div>

      <div className="flex max-w-[1300px] w-full justify-between items-center">
        <div className="flex flex-col justify-between items-start w-full">
          <p className="text-[22px] mb-[20px]">services offered</p>

          <div className="flex w-full justify-between">
            {services.map((service) => (
              <ProfileService
                key={service.id}
                name={service.attributes.name}
                description={service.attributes.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
