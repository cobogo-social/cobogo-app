import { ReactNode } from 'react';

interface StepContainerProps {
  children: ReactNode;
}

export default function StepContainer({ children }: StepContainerProps) {
  return (
    <div className="w-full h-full  pl-0 sm:pl-8 pt-0 sm:pt-8 p-8">
      {children}
    </div>
  );
}
