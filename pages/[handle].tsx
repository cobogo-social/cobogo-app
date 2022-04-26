import BlankslateChannelBanner from '@components/BlankslateChannelBanner';
import Button from '@components/Button';
import CobogoTopBar from '@components/CobogoTopBar';
import Footer from '@components/Footer';
import Link from '@components/Link';
import { readChannelByProfile, readProfileByHandle } from '@services/cobogoApi';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

interface ProfileProps {
  title: string;
  banner: string;
  referralCode: string;
}

export default function Index({ title, banner, referralCode }: ProfileProps) {
  return (
    <>
      <div className="h-[92.5vh] flex flex-col justify-start items-center p-8">
        <CobogoTopBar />

        <div className="flex flex-col items-center">
          <BlankslateChannelBanner banner={banner} title={title} />

          <p className="text-sm sm:text-base text-white sm:w-[439px] text-center w-full mb-[32px]">
            if you're a <span className="font-bold">YouTuber</span>, start your
            submission now and be one of the first in this new{' '}
            <span className="font-bold">Creator Economy</span>.
          </p>

          <div className="flex items-center justify-center w-full">
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
  const session = await getSession({ req });
  const { handle } = params;

  const profile = await readProfileByHandle(handle, session);

  if (!profile) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const channel = await readChannelByProfile(profile, session);

  return {
    props: {
      title: channel.attributes.title,
      banner: channel.attributes.banner ? channel.attributes.banner : null,
      referralCode: profile.attributes.referral_code,
    },
  };
};
