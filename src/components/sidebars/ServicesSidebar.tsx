import SidebarContainer from '@components/containers/SidebarContainer';
import AddIcon from '@components/icons/AddIcon';
import HorizontalService from '@components/profile/HorizontalService';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import AddServiceSidebar from './AddServiceSidebar';
import EditServiceSidebar from './EditServiceSidebar';

interface ServicesSidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  services: any[];
  handle: string;
}

interface IService {
  id: number;
  title: string;
  description: string;
}

export default function ServicesSidebar(props: ServicesSidebarProps) {
  const [addServiceSidebarIsOpen, setAddServiceSidebarIsOpen] = useState(false);
  const [editServiceSidebarIsOpen, setEditServiceSidebarIsOpen] =
    useState(false);

  const [service, setService] = useState<IService>({
    id: null,
    title: '',
    description: '',
  });

  function closeServicesSidebar() {
    props.setOpen(false);
  }

  function openAddServiceSidebar() {
    setAddServiceSidebarIsOpen(true);
    closeServicesSidebar();
  }

  function closeAddServiceSidebar() {
    setAddServiceSidebarIsOpen(false);
  }

  function returnToServicesSidebar() {
    setAddServiceSidebarIsOpen(false);
    props.setOpen(true);
  }

  function openEditServiceSidebar(
    id: number,
    title: string,
    description: string,
  ) {
    setService({
      id,
      title,
      description,
    });
    setEditServiceSidebarIsOpen(true);
    closeServicesSidebar();
  }

  function closeEditServiceSidebar() {
    setEditServiceSidebarIsOpen(false);
  }

  useEffect(() => {
    if (props.open || addServiceSidebarIsOpen) {
      document.body.classList.add('active-modal');
    } else {
      document.body.classList.remove('active-modal');
    }
  }, [addServiceSidebarIsOpen, props.open]);

  return (
    <>
      {editServiceSidebarIsOpen ? (
        <EditServiceSidebar
          closeEditServiceSidebar={closeEditServiceSidebar}
          handle={props.handle}
          returnToServicesSidebar={returnToServicesSidebar}
          service={service}
        />
      ) : null}

      {addServiceSidebarIsOpen ? (
        <AddServiceSidebar
          closeAddServiceSidebar={closeAddServiceSidebar}
          handle={props.handle}
          returnToServicesSidebar={returnToServicesSidebar}
        />
      ) : null}

      {props.open ? (
        <SidebarContainer>
          <div
            onClick={closeServicesSidebar}
            className="absolute top-0 right-0 mt-[20px] mr-[20px] hover:cursor-pointer"
          >
            <Image
              src="/images/x2-icon.svg"
              width={13}
              height={13}
              alt="x2 icon"
            />
          </div>

          <p className="text-white text-[40px] mb-5 flex gap-5 items-center">
            services offered
            <div onClick={openAddServiceSidebar}>
              <AddIcon size={24} />
            </div>
          </p>

          <div className="flex flex-col gap-10 w-full">
            {props.services?.map((horizontalService) => (
              <HorizontalService
                key={service.id}
                serviceId={horizontalService.id}
                name={horizontalService.attributes.name}
                description={horizontalService.attributes.description}
                handle={props.handle}
                closeServicesSidebar={closeServicesSidebar}
                openEditServiceSidebar={openEditServiceSidebar}
                bannerImage={horizontalService.attributes.banner_image}
              />
            ))}
          </div>

          <div className="fixed bottom-0 right-0 w-[600px] h-16 bg-gradient-to-t from-black to-black[0] z-40 px-[70px] py-10 flex items-end" />
        </SidebarContainer>
      ) : null}
    </>
  );
}
