import EditIcon from '@components/icons/EditIcon';
import ServicesSidebar from '@components/sidebars/ServicesSidebar';
import { useState } from 'react';

import Service from './Service';

interface ServicesProps {
  services: any[];
  isOwner: boolean;
  handle: string;
}

export default function Services(props: ServicesProps) {
  const [servicesSidebarIsOpen, setServicesSidebarIsOpen] = useState(false);

  function openServicesSidebar() {
    setServicesSidebarIsOpen(true);
  }

  return (
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

        <div className="flex max-w-[1010px] w-full justify-between items-center">
          <div className="flex flex-col justify-between items-start w-full">
            <p className="text-[22px] mb-6">services offered</p>

            <div className="flex w-full justify-start gap-10">
              {props.services?.length ? (
                props.services.map((service) => (
                  <Service
                    key={service.id}
                    name={service.attributes.name}
                    description={service.attributes.description}
                    bannerImage={service.attributes.banner_image}
                  />
                ))
              ) : !props.services?.length && props.isOwner ? (
                <>
                  <div className="relative">
                    <div className="px-3 py-1 absolute z-10 bg-violet left-[-3px] top-3">
                      <strong>no service has been added</strong>
                    </div>

                    <Service
                      name="add service"
                      description="write a quick description of a service you can offer to clients"
                      noMoreInfoButton
                      bannerImage="/images/service-1.png"
                      handle={props.handle}
                    />
                  </div>

                  <div className="relative">
                    <div className="px-3 py-1 absolute z-10 bg-violet left-[-3px] top-3">
                      <strong>no service has been added</strong>
                    </div>

                    <Service
                      name="add service"
                      description="write a quick description of another service you can offer to clients"
                      noMoreInfoButton
                      bannerImage="/images/service-2.png"
                      handle={props.handle}
                    />
                  </div>

                  <div className="relative">
                    <div className="px-3 py-1 absolute z-10 bg-violet left-[-3px] top-3">
                      <strong>no service has been added</strong>
                    </div>

                    <Service
                      name="add service"
                      description="write a quick description of another service you can offer to clients"
                      noMoreInfoButton
                      bannerImage="/images/service-3.png"
                      handle={props.handle}
                    />
                  </div>
                </>
              ) : (
                !props.services?.length && null
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
