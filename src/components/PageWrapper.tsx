import { ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="grid grid-rows-1 sm:grid-rows-[92.5vh_70px] grid-cols-1 sm:grid-cols-[332px_1fr]">
      {children}
    </div>
  );
}
