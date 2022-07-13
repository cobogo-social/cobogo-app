import AddIcon from '@components/icons/AddIcon';
import AddServiceSidebar from '@components/sidebars/AddServiceSidebar';
import Image from 'next/image';
import { useState } from 'react';

import Button from '../Button';
import ServiceSidebar from '../sidebars/ServiceSidebar';

interface ServiceProps {
  name: string;
  description: string;
  bannerImage?: string;
  noMoreInfoButton?: boolean;
  handle?: string;
}

export default function Service(props: ServiceProps) {
  const [serviceSidebarIsOpen, setServiceSidebarIsOpen] = useState(false);
  const [addServiceSidebarIsOpen, setAddServiceSidebarIsOpen] = useState(false);

  function openServiceModal() {
    setServiceSidebarIsOpen(true);
  }

  function openAddServiceSidebar() {
    setAddServiceSidebarIsOpen(true);
  }

  function closeAddServiceSidebar() {
    setAddServiceSidebarIsOpen(false);
  }

  return (
    <>
      {addServiceSidebarIsOpen ? (
        <AddServiceSidebar
          closeAddServiceSidebar={closeAddServiceSidebar}
          handle={props.handle}
        />
      ) : null}

      <ServiceSidebar
        open={serviceSidebarIsOpen}
        setOpen={setServiceSidebarIsOpen}
        name={props.name}
        description={props.description}
        bannerImage={props.bannerImage}
      />

      <div className="w-[310px] border border-gray10">
        <div className="bg-blue w-full h-[204px] relative">
          {props.bannerImage ? (
            <Image
              src={props.bannerImage}
              objectFit="cover"
              layout="fill"
              alt="banner image"
            />
          ) : (
            <Image
              src="/images/service-1.png"
              objectFit="cover"
              layout="fill"
              alt="banner image"
            />
          )}
        </div>

        <div
          className={`px-8 py-10 flex flex-col ${
            !props.noMoreInfoButton && 'h-[260px]'
          } justify-between`}
        >
          {!props.noMoreInfoButton ? (
            <p className="text-[22px] flex gap-2 hover:cursor-pointer">
              {props.name}
            </p>
          ) : (
            <button
              onClick={openAddServiceSidebar}
              className="text-[22px] flex gap-2 items-center hover:cursor-pointer"
            >
              {props.name} {props.noMoreInfoButton && <AddIcon size={18} />}
            </button>
          )}

          <p
            className={`${
              !props.noMoreInfoButton ? 'mb-8' : 'mb-0'
            } break-words`}
          >
            {props.description.slice(0, 111)} (...)
          </p>

          {!props.noMoreInfoButton && (
            <div>
              <Button
                color="bg-gray7"
                text="more info"
                borderColor="border-gray2"
                borderSize="border"
                textColor="text-blue"
                onClick={openServiceModal}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
