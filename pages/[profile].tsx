import BlankslateShareLinks from '@components/BlankslateShareLinks';
import Button from '@components/Button';
import CobogoTopBar from '@components/CobogoTopBar';
import Footer from '@components/Footer';
import Link from '@components/Link';
import StatsTopBar from '@components/StatsTopBar';
import {
  readChannelByProfile,
  readProfileByChannel,
  readProfileByHandle,
  readProfilesByReferral,
} from '@services/cobogoApi';
import { readChannel } from '@services/youtubeApi';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Image from 'next/image';

interface ProfileProps {
  title: string;
  banner: string;
  referralCode: string;
  onboardedFriends: number;
  isMine: boolean;
}

export default function Index({
  title,
  banner,
  referralCode,
  onboardedFriends,
  isMine,
}: ProfileProps) {
  return (
    <>
      <div className="h-[92.5vh] flex flex-col justify-start items-center p-8">
        {isMine ? (
          <StatsTopBar onboardedFriends={onboardedFriends} />
        ) : (
          <CobogoTopBar />
        )}

        <div className="flex flex-col">
          <div className="bg-black w-[768px] max-h-[232px] border-[1.5px] border-details mb-[100px]">
            {banner ? (
              <Image
                src={banner}
                width={766}
                height={121}
                objectFit="cover"
                alt={banner}
              />
            ) : null}

            <div className="w-full px-8 py-4">
              <p className="text-xl text-white">coming soon...</p>

              <p className="text-white">
                soon it will be possible to support the{' '}
                <span className="font-bold">{title}</span> channel through this
                page.
              </p>
            </div>
          </div>

          <div className="mb-[100px]">
            <BlankslateShareLinks referralCode={referralCode} />
          </div>

          {!isMine ? (
            <div className="flex w-full justify-center items-center">
              <Link href="/submit?ref=a">
                <Button
                  text="join waitlist"
                  color="bg-purple"
                  hoverColor="brightness-90"
                  width="w-[175px]"
                  height="h-[50px]"
                  fontSize="text-xl"
                />
              </Link>
            </div>
          ) : null}
        </div>
      </div>

      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { profile } = params;
  const session = await getSession({ req });

  const response = await readProfileByHandle(profile);
  const channel = await readChannelByProfile(response);
  const profileByChannel = await readProfileByChannel(channel);
  const onboardedFriends = await readProfilesByReferral(profileByChannel.id);

  if (!response) {
    return {
      redirect: {
        destination: '/submit/connect',
        permanent: false,
      },
    };
  }

  if (session?.user) {
    const youtubeChannel = await readChannel(session);

    if (youtubeChannel.id === channel.attributes.channel_id) {
      return {
        props: {
          title: channel.attributes.title,
          banner: channel.attributes.banner ? channel.attributes.banner : null,
          referralCode: profileByChannel.attributes.referral_code,
          onboardedFriends: onboardedFriends.length,
          isMine: true,
        },
      };
    }
  } else {
    return {
      props: {
        title: channel.attributes.title,
        banner: channel.attributes.banner ? channel.attributes.banner : null,
        referralCode: profileByChannel.attributes.referral_code,
        isMine: false,
      },
    };
  }

  return {
    props: {},
  };
};
