import { ReactNode } from 'react';

interface SidebarContainerProps {
  children: ReactNode;
}

export default function SidebarContainer(props: SidebarContainerProps) {
  return (
    <div className="w-screen h-screen fixed top-0 right-0 z-30 bg-black/[0.8]">
      <div className="absolute top-0 right-0 bg-primary w-screen sm:w-[600px] h-screen flex flex-col justify-start items-start px-5 sm:px-[70px] py-10 sm:py-[70px] shadow-[0_0px_4px_10px_rgba(0,0,0,0.4)] overflow-auto">
        {props.children}
      </div>
    </div>
  );
}
