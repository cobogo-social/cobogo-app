import SidebarContainer from '@components/containers/SidebarContainer';
import EditProfileForm from '@components/forms/EditProfileForm';
import Image from 'next/image';
import { useEffect } from 'react';

interface EditAboutSidebarProps {
  description: string;
  categories: unknown[];
  opened: boolean;
  close: () => void;
  handle: string;
  tags: string[];
  categoryName: string;
  categoryId: number;
  website: string;
  presentationVideo: string;
  languages: string[];
  languageName: string;
  languageId: number;
  profileImage: string;
  bannerImage: string;
  baseImageUrl: string;
  editingPresentationVideo: boolean;
}

export default function EditAboutSidebar(props: EditAboutSidebarProps) {
  function closeModal() {
    props.close();
  }

  useEffect(() => {
    if (props.opened) {
      document.body.classList.add('active-modal');
    } else {
      document.body.classList.remove('active-modal');
    }
  }, [props.opened]);

  return props.opened ? (
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
        languages={props.languages}
        languageName={props.languageName}
        languageId={props.languageId}
        profileImage={props.profileImage}
        bannerImage={props.bannerImage}
        baseImageUrl={props.baseImageUrl}
        editingPresentationVideo={props.editingPresentationVideo}
      />
    </SidebarContainer>
  ) : null;
}
