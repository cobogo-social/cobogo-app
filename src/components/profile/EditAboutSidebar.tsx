import EditProfileForm from '@components/EditProfileForm';
import SidebarContainer from '@components/sidebars/SidebarContainer';
import Image from 'next/image';

interface EditAboutSidebarProps {
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categories: any[];
  open: boolean;
  setOpen: (value: boolean) => void;
  handle: string;
  tags: string[];
  categoryName: string;
}

export default function EditAboutSidebar(props: EditAboutSidebarProps) {
  function closeModal() {
    props.setOpen(false);
  }

  return props.open ? (
    <SidebarContainer open={props.open}>
      <div
        onClick={closeModal}
        className="absolute top-0 right-0 mt-[20px] mr-[20px] hover:cursor-pointer"
      >
        <Image src="/images/x2-icon.svg" width={13} height={13} alt="x2 icon" />
      </div>

      <EditProfileForm
        description={props.description}
        categories={props.categories}
        buttonText="save"
        route={`/${props.handle}`}
        title="basic info"
        handle={props.handle}
        tags={props.tags}
        categoryName={props.categoryName}
        edit
      />
    </SidebarContainer>
  ) : null;
}
