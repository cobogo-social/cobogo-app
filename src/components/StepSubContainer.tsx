import { ReactNode } from 'react';

interface StepSubContainerProps {
  children: ReactNode;
}
export default function StepSubContainer({ children }: StepSubContainerProps) {
  return (
    <div className="flex flex-row justify-between items-start pl-16 sm:px-16 2xl:px-64 mt-16 sm:mt-0 px-8 py-4">
      {children}
    </div>
  );
}
