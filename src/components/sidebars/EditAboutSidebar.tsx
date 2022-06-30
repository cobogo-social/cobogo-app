import SidebarContainer from '@components/containers/SidebarContainer';
import EditProfileForm from '@components/forms/EditProfileForm';
import Image from 'next/image';
import { useEffect } from 'react';

interface EditAboutSidebarProps {
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categories: any[];
  open: boolean;
  setOpen: (value: boolean) => void;
  handle: string;
  tags: string[];
  categoryName: string;
  categoryId: number;
  website: string;
  presentationVideo: string;
}

export default function EditAboutSidebar(props: EditAboutSidebarProps) {
  function closeModal() {
    props.setOpen(false);
  }

  useEffect(() => {
    if (props.open) {
      document.body.classList.add('active-modal');
    } else {
      document.body.classList.remove('active-modal');
    }
  }, [props.open]);

  return props.open ? (
    <SidebarContainer>
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
        title="basic info"
        handle={props.handle}
        tags={props.tags}
        categoryName={props.categoryName}
        edit
        categoryId={props.categoryId}
        closeModal={closeModal}
        website={props.website}
        presentationVideo={props.presentationVideo}
      />
    </SidebarContainer>
  ) : null;
}