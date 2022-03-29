import { ReactNode } from 'react';

interface StepWrapperProps {
  children: ReactNode;
}
export default function StepWrapper({ children }: StepWrapperProps) {
  return (
    <div className="flex flex-row justify-between items-start pl-16 sm:px-16 2xl:px-64 mt-16 sm:mt-0">
      {children}
    </div>
  );
}
