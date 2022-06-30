import EditIcon from '@components/icons/EditIcon';
import ServicesSidebar from '@components/sidebars/ServicesSidebar';
import Image from 'next/image';
import { useState } from 'react';

import Service from './Service';

interface ServicesProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  services: any[];
  isOwner: boolean;
  handle: string;
}

export default function Services(props: ServicesProps) {
  const [servicesSidebarIsOpen, setServicesSidebarIsOpen] = useState(false);

  function openServicesSidebar() {
    setServicesSidebarIsOpen(true);
  }

  return props.services.length ? (
    <>
      <ServicesSidebar
        open={servicesSidebarIsOpen}
        setOpen={setServicesSidebarIsOpen}
        services={props.services}
        handle={props.handle}
      />

      <div className="w-full hidden sm:flex flex-col items-center justify-start relative bg-gray7 py-[70px] px-[150px]">
        {props.isOwner && (
          <div
            onClick={openServicesSidebar}
            className="flex hover:cursor-pointer absolute top-[30px] left-[30px]"
          >
            <EditIcon size={30} />
          </div>
        )}

        <div className="flex max-w-[1000px] w-full justify-between items-center">
          <div className="flex flex-col justify-between items-start w-full">
            <p className="text-[22px] mb-6">services offered</p>

            <div className="flex w-full justify-start gap-10">
              {props.services?.map((service) => (
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
    </>
  ) : (
    <>
      <ServicesSidebar
        open={servicesSidebarIsOpen}
        setOpen={setServicesSidebarIsOpen}
        services={props.services}
        handle={props.handle}
      />

      <div className="w-full hidden sm:flex flex-col gap-3 items-center justify-center relative bg-gray7 py-[70px] px-[150px]">
        {props.isOwner && (
          <div
            onClick={openServicesSidebar}
            className="flex hover:cursor-pointer absolute top-[30px] left-[30px]"
          >
            <EditIcon size={30} />
          </div>
        )}

        <Image
          src="/images/blankslate-icon.png"
          width={60}
          height={60}
          alt="blankslate icon"
        />

        <p className="text-[22px]">no service has been added</p>
      </div>
    </>
  );
}
