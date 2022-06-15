import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="grid grid-rows-1 grid-cols-1 sm:grid-cols-[332px_1fr]">
      {children}
    </div>
  );
}
