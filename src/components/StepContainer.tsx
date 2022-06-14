import { ReactNode } from 'react';

interface StepContainerProps {
  children: ReactNode;
}

export default function StepContainer({ children }: StepContainerProps) {
  return <div className="w-full h-full">{children}</div>;
}
