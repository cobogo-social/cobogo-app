import { LoadingContext } from '@contexts/LoadingContext';
import { useContext } from 'react';

import Link from './Link';

interface Earn1000CBGNotificationProps {
  verifiedVideo: boolean;
}

export default function Earn1000CBGNotification({
  verifiedVideo,
}: Earn1000CBGNotificationProps) {
  const { setLoading } = useContext(LoadingContext);

  return (
    <div className="flex h-[60px] justify-start items-center mb-[20px]">
      <div
        className={`w-[30px] h-[60px] border-l-4 ${
          verifiedVideo ? 'border-green' : 'border-gray9'
        } hidden sm:flex justify-center items-center`}
      />

      <div>
        <p className="sm:w-[387px] font-bold text-xs sm:text-base">
          earn 1,000 more CBG tokens recording a video
        </p>

        {verifiedVideo ? (
          <p className="sm:w-[387px] font-bold text-xs sm:text-base text-green flex">
            done
          </p>
        ) : (
          <Link href="/submit/video">
            <button
              onClick={() => setLoading(true)}
              className="sm:w-[387px] font-bold text-xs sm:text-base text-blue flex"
            >
              view rules
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
