import BlankslateChannelBanner from '@components/BlankslateChannelBanner';
import BlankslateShareLinks from '@components/BlankslateShareLinks';
import BlankslateStatsTopBar from '@components/BlankslateStatsTopBar';
import Button from '@components/Button';
import CobogoTopBar from '@components/CobogoTopBar';
import Footer from '@components/Footer';
import Link from '@components/Link';
import {
  readChannelByProfile,
  readProfileByChannel,
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
  const { handle } = params;
  const session = await getSession({ req });

  const response = await readProfileByHandle(handle);
  const channel = await readChannelByProfile(response);
  const profile = await readProfileByChannel(channel);
  const onboardedFriends = await readProfilesByReferral(profile.id);

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
          referralCode: profile.attributes.referral_code,
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
        referralCode: profile.attributes.referral_code,
        isMine: false,
      },
    };
  }

  return {
    props: {},
  };
};
