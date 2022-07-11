import Image from 'next/image';
import { useState } from 'react';

import Button from '../Button';
import ServiceSidebar from '../sidebars/ServiceSidebar';

interface ServiceProps {
  name: string;
  description: string;
  bannerImage: string;
}

export default function Service(props: ServiceProps) {
  const [serviceSidebarIsOpen, setServiceSidebarIsOpen] = useState(false);

  function openServiceModal() {
    setServiceSidebarIsOpen(true);
  }

  return (
    <>
      <ServiceSidebar
        open={serviceSidebarIsOpen}
        setOpen={setServiceSidebarIsOpen}
        name={props.name}
        description={props.description}
        bannerImage={props.bannerImage}
      />

      <div className="w-[310px] h-[464px] border border-gray10">
        <div className="bg-blue w-[310px] h-[204px] relative">
          {props.bannerImage && (
            <Image
              src={props.bannerImage}
              objectFit="cover"
              layout="fill"
              alt="banner image"
            />
          )}
        </div>

        <div className="px-8 py-10 flex flex-col h-[260px] justify-between">
          <p className="text-[22px]">{props.name}</p>

          <p className="mb-8 break-words">
            {props.description.slice(0, 111)} (...)
          </p>

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
        </div>
      </div>
    </>
  );
}
