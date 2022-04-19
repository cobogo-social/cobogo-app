import { ReactNode } from 'react';

interface BlankslateContainerProps {
  children: ReactNode;
}

export default function BlankslateContainer({
  children,
}: BlankslateContainerProps) {
  return (
    <div className="flex flex-col items-center justify-start h-full">
      {children}
    </div>
  );
}
