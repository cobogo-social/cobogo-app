import SidebarContainer from '@components/containers/SidebarContainer';
import AddServiceForm from '@components/forms/AddServiceForm';
import AddIcon from '@components/icons/AddIcon';
import HorizontalService from '@components/profile/HorizontalService';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ServicesSidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  services: any[];
  handle: string;
}

export default function ServicesSidebar(props: ServicesSidebarProps) {
  const [addServiceSidebarIsOpen, setAddServiceSidebarIsOpen] = useState(false);

  function closeModal() {
    props.setOpen(false);
  }

  function openAddServiceSidebar() {
    setAddServiceSidebarIsOpen(true);
    closeModal();
  }

  function closeAddServiceSidebar() {
    setAddServiceSidebarIsOpen(false);
  }

  function returnToServicesSidebar() {
    setAddServiceSidebarIsOpen(false);
    props.setOpen(true);
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
      {addServiceSidebarIsOpen ? (
        <SidebarContainer>
          <div
            onClick={closeAddServiceSidebar}
            className="absolute top-0 right-0 mt-[20px] mr-[20px] hover:cursor-pointer"
          >
            <Image
              src="/images/x2-icon.svg"
              width={13}
              height={13}
              alt="x2 icon"
            />
          </div>

          <AddServiceForm
            title="add a service"
            buttonText="add"
            closeModal={closeAddServiceSidebar}
            handle={props.handle}
            returnToServicesSidebar={returnToServicesSidebar}
          />
        </SidebarContainer>
      ) : null}

      {props.open ? (
        <SidebarContainer>
          <div
            onClick={closeModal}
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

          <div className="flex flex-col gap-10">
            {props.services?.map((service) => (
              <HorizontalService
                key={service.id}
                serviceId={service.id}
                name={service.attributes.name}
                description={service.attributes.description}
                handle={props.handle}
                closeModal={closeModal}
              />
            ))}
          </div>

          <div className="fixed bottom-0 right-0 w-[600px] h-16 bg-gradient-to-t from-black to-black[0] z-40 px-[70px] py-10 flex items-end" />
        </SidebarContainer>
      ) : null}
    </>
  );
}
