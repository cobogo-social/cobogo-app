import BlankslateChannelBanner from '@components/BlankslateChannelBanner';
import BlankslateShareLinks from '@components/BlankslateShareLinks';
import BlankslateStatsTopBar from '@components/BlankslateStatsTopBar';
import Button from '@components/Button';
import CobogoTopBar from '@components/CobogoTopBar';
import Footer from '@components/Footer';
import Link from '@components/Link';
import {
  readChannelByProfile,
  readProfileByHandle,
  readProfilesByReferral,
} from '@services/cobogoApi';
import { readChannel } from '@services/youtubeApi';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

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
          <BlankslateStatsTopBar onboardedFriends={onboardedFriends} />
        ) : (
          <CobogoTopBar />
        )}

        <div className="flex flex-col">
          <BlankslateChannelBanner banner={banner} title={title} />

          {isMine ? (
            <div className="mb-[100px]">
              <BlankslateShareLinks referralCode={referralCode} />
            </div>
          ) : null}

          {!isMine ? (
            <div className="flex w-full justify-center items-center">
              <Link href={`/submit?ref=${referralCode}`}>
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
  const { handle } = params;
  const session = await getSession({ req });

  const profile = await readProfileByHandle(handle);

  if (!profile) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const channel = await readChannelByProfile(profile);
  const onboardedFriends = await readProfilesByReferral(profile.id);

  let youtubeChannel = {
    id: null,
  };

  if (session?.user) {
    const readChannels = await readChannel(session);

    youtubeChannel = readChannels;
  }

  return {
    props: {
      title: channel.attributes.title,
      banner: channel.attributes.banner ? channel.attributes.banner : null,
      referralCode: profile.attributes.referral_code,
      onboardedFriends:
        youtubeChannel.id === channel.attributes.channel_id
          ? onboardedFriends.length
          : null,
      isMine: youtubeChannel.id === channel.attributes.channel_id,
    },
  };
};
