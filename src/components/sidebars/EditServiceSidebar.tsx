import SidebarContainer from '@components/containers/SidebarContainer';
import EditServiceForm from '@components/forms/EditServiceForm';
import Image from 'next/image';

interface IService {
  id: number;
  title: string;
  description: string;
}

interface EditServiceSidebarProps {
  closeEditServiceSidebar: () => void;
  handle: string;
  returnToServicesSidebar?: () => void;
  service: IService;
}

export default function EditServiceSidebar(props: EditServiceSidebarProps) {
  return (
    <SidebarContainer>
      <div
        onClick={props.closeEditServiceSidebar}
        className="absolute top-0 right-0 mt-[20px] mr-[20px] hover:cursor-pointer"
      >
        <Image src="/images/x2-icon.svg" width={13} height={13} alt="x2 icon" />
      </div>

      <EditServiceForm
        title="edit a service"
        buttonText="edit"
        closeSidebar={props.closeEditServiceSidebar}
        handle={props.handle}
        returnToServicesSidebar={props.returnToServicesSidebar}
        service={props.service}
      />
    </SidebarContainer>
  );
}
