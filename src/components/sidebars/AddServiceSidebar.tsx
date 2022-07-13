import SidebarContainer from '@components/containers/SidebarContainer';
import AddServiceForm from '@components/forms/AddServiceForm';
import Image from 'next/image';

interface AddServiceSidebarProps {
  closeAddServiceSidebar: () => void;
  handle: string;
  returnToServicesSidebar?: () => void;
}

export default function AddServiceSidebar(props: AddServiceSidebarProps) {
  return (
    <SidebarContainer>
      <div
        onClick={props.closeAddServiceSidebar}
        className="absolute top-0 right-0 mt-[20px] mr-[20px] hover:cursor-pointer"
      >
        <Image src="/images/x2-icon.svg" width={13} height={13} alt="x2 icon" />
      </div>

      <AddServiceForm
        title="add a service"
        buttonText="add"
        closeSidebar={props.closeAddServiceSidebar}
        handle={props.handle}
        returnToServicesSidebar={props.returnToServicesSidebar}
      />
    </SidebarContainer>
  );
}
