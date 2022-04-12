import { ReactNode } from 'react';

interface ReferralDashboardWrapperProps {
  children: ReactNode;
}

export default function ReferralDashboardWrapper({
  children,
}: ReferralDashboardWrapperProps) {
  return (
    <div className="flex flex-col items-center justify-start h-full">
      {children}
    </div>
  );
}
