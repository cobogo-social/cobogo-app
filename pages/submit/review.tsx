import Review from '../../components/Review';
import Footer from '../../components/Footer';
import Steps from '../../components/Steps';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import youtubeApi from '../../services/youtubeApi';
import Head from 'next/head';

interface ReviewProps {
  banner: string;
  title: string;
  description: string;
}

export default function Index({ banner, title, description }: ReviewProps) {
  return (
    <div className="w-full">
      <Head>
        <title>cobogo - submit</title>
      </Head>
      <div className="grid grid-rows-[945px_70px] grid-cols-[332px_1fr]">
        <Steps />
        <Review banner={banner} title={title} description={description} />

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

  return {
    props: {
      banner: response.data.items[0].brandingSettings.image.bannerExternalUrl,
      title: response.data.items[0].snippet.title,
      description: response.data.items[0].snippet.description,
    },
  };
};
