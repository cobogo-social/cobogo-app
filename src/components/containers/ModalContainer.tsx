import { ReactNode } from 'react';

interface ModalContainerProps {
  children: ReactNode;
}

export default function ModalContainer(props: ModalContainerProps) {
  return (
    <div className="w-screen h-screen fixed top-0 right-0 z-30 flex justify-center items-center bg-black/[0.8]">
      <div className="relative bg-primary w-[605px] flex flex-col justify-center items-center border border-gray10 p-[70px] shadow-[0_0px_4px_10px_rgba(0,0,0,0.4)]">
        <div className="flex flex-col items-start justify-center">
          {props.children}
        </div>
      </div>
    </div>
  );
}
