import Image from 'next/image';

import Service from './Service';

interface ServicesProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  services: any[];
  isOwner: boolean;
}

export default function Services({ services, isOwner }: ServicesProps) {
  return (
    <div className="w-full hidden sm:flex flex-col items-center justify-start relative bg-gray7 py-[70px] px-[150px]">
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
        <div className="flex flex-col justify-between items-start w-full">
          <p className="text-[22px] mb-6">services offered</p>

          <div className="flex w-full justify-start gap-10">
            {services?.map((service) => (
              <Service
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
