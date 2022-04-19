import { ReactNode } from 'react';

interface ReferralDashboardContainerProps {
  children: ReactNode;
}

export default function ReferralDashboardContainer({
  children,
}: ReferralDashboardContainerProps) {
  return (
    <div className="flex flex-col items-center justify-start h-full">
      {children}
    </div>
  );
}
