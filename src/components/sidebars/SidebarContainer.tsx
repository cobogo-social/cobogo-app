import { ReactNode, useEffect } from 'react';

interface SidebarContainerProps {
  children: ReactNode;
  open: boolean;
}

export default function SidebarContainer(props: SidebarContainerProps) {
  useEffect(() => {
    if (props.open) {
      document.body.classList.add('active-modal');
    } else {
      document.body.classList.remove('active-modal');
    }
  }, [props.open]);

  return (
    <div className="w-screen h-screen fixed top-0 right-0 z-10 bg-black/[0.5]">
      <div className="absolute top-0 right-0 bg-primary w-[600px] h-screen flex flex-col justify-start items-center p-[70px] shadow-[0_0px_4px_10px_rgba(0,0,0,0.4)] overflow-auto">
        {props.children}
      </div>
    </div>
  );
}
