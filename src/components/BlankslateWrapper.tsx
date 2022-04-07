import { ReactNode } from 'react';

interface BlankslateWrapperProps {
  children: ReactNode;
}

export default function BlankslateWrapper({
  children,
}: BlankslateWrapperProps) {
  return (
    <div className="flex flex-col items-center justify-start h-full">
      {children}
    </div>
  );
}
