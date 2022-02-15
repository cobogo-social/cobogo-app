import Video from '../../components/Video';
import Footer from '../../components/Footer';
import Steps from '../../components/Steps';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import youtubeApi from '../../services/youtubeApi';
import cobogoApi from '../../services/cobogoApi';
import Head from 'next/head';

interface VideoProps {
  banner: string;
  title: string;
  description: string;
  channelHandle: string;
}

export default function Index({
  banner,
  title,
  description,
  channelHandle,
}: VideoProps) {
  return (
    <div className="w-full">
      <Head>
        <title>cobogo - submit</title>
      </Head>
      <div className="grid grid-rows-[945px_70px] grid-cols-[332px_1fr]">
        <Steps />
        <Video
          banner={banner}
          title={title}
          description={description}
          channelHandle={channelHandle}
        />

        <Footer />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.user) {
    return {
      redirect: {
        destination: '/submit/connect',
        permanent: false,
      },
    };
  }

  const response = await youtubeApi.get(
    `/channels?part=snippet%2CbrandingSettings&mine=true`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  );

  const createdProfile = await cobogoApi.get(
    `/api/profiles?filters[account_email][$eq]=${session?.user.email}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.COBOGO_API_TOKEN}`,
      },
    }
  );

  return {
    props: {
      banner: response.data.items[0].brandingSettings.image.bannerExternalUrl,
      title: response.data.items[0].snippet.title,
      description: response.data.items[0].snippet.description,
      channelHandle: createdProfile.data.data[0].attributes.handle,
    },
  };
};
