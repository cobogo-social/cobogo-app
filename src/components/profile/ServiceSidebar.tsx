import SidebarContainer from '@components/containers/SidebarContainer';
import Image from 'next/image';
import { useEffect } from 'react';

interface ServiceSidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  name: string;
  description: string;
}

export default function ServiceSidebar(props: ServiceSidebarProps) {
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

      <p className="text-white text-[40px] mb-5">{props.name}</p>

      <div className="bg-blue w-full min-h-[272px] mb-5" />

      <p>
        {props.description} {props.description} {props.description}{' '}
        {props.description}
      </p>

      <div className="fixed bottom-0 right-0 w-[600px] h-16 bg-gradient-to-t from-black to-black[0] z-[1000] px-[70px] py-10 flex items-end" />
    </SidebarContainer>
  ) : null;
}
