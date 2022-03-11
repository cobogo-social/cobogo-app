import Image from 'next/image';
import { useState } from 'react';

interface TopBarProps {
  email?: string;
}

export default function StatsTopBar({ email }: TopBarProps) {
  const [acceptedLength, setAcceptedLength] = useState('');

  // useEffect(() => {
  //   if (email) {
  //     youtubeApi
  //       .get(`/channels?part=snippet%2CbrandingSettings&mine=true`, {
  //         headers: {
  //           Authorization: `Bearer ${session?.accessToken}`,
  //         },
  //       })
  //       .then((channel) => {
  //         axios
  //           .get('/api/cobogo/readProfileByChannelId', {
  //             params: { channel_id: channel.data.items[0].id },
  //           })
  //           .then((response) => {
  //             axios
  //               .get('/api/cobogo/readProfileByReferralProfileId', {
  //                 params: {
  //                   referral_profile_id: response.data.data[0].id,
  //                 },
  //               })
  //               .then((response) =>
  //                 setAcceptedLength(response.data.data.length)
  //               );
  //           });
  //       });
  //   }
  // }, []);

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

        <p className="text-white font-bold">850 CBG</p>
      </div>
    </div>
  );
}
