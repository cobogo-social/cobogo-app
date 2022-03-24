import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { readProfileByReferralId } from '../services/cobogoApi';

interface StatsTopBarProps {
  profileId: number;
}

export default function StatsTopBar({ profileId }: StatsTopBarProps) {
  const [acceptedLength, setAcceptedLength] = useState('-');

  useEffect(() => {
    readProfileByReferralId(profileId);
  }, []);

  return (
    <div className="hidden sm:flex w-full justify-end items-center mb-[70px]">
      <a>
        <p className="text-white mr-8">
          onboarded friends: <span className="font-bold">{acceptedLength}</span>
        </p>
      </a>

      <div className="flex">
        <div className="flex mr-2">
          <Image src="/images/cbg-icon.svg" width={24} height={21} />
        </div>

        <p className="text-white font-bold">100 CBG</p>
      </div>
    </div>
  );
}
