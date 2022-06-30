import SidebarContainer from '@components/containers/SidebarContainer';
import AddIcon from '@components/icons/AddIcon';
import HorizontalService from '@components/profile/HorizontalService';
import Image from 'next/image';

interface ServicesSidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  services: any[];
  handle: string;
}

export default function ServicesSidebar(props: ServicesSidebarProps) {
  function closeModal() {
    props.setOpen(false);
  }

  return props.open ? (
    <SidebarContainer>
      <div
        onClick={closeModal}
        className="absolute top-0 right-0 mt-[20px] mr-[20px] hover:cursor-pointer"
      >
        <Image src="/images/x2-icon.svg" width={13} height={13} alt="x2 icon" />
      </div>

      <p className="text-white text-[40px] mb-5 flex gap-5 items-center">
        services offered <AddIcon size={24} />
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
  ) : null;
}
