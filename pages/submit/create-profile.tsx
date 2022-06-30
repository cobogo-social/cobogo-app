import ChannelBox from '@components/ChannelBox';
import EditProfileForm from '@components/forms/EditProfileForm';
import PageContainer from '@components/PageContainer';
import StepContainer from '@components/StepContainer';
import Steps from '@components/Steps';
import StepSubContainer from '@components/StepSubContainer';
import TopBar from '@components/TopBar';
import { LoadingContext } from '@contexts/LoadingContext';
import { fetchSessionData, readCategories } from '@services/cobogoApi';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useContext, useEffect } from 'react';

interface CreateProfileProps {
  bannerImage: string;
  title: string;
  youtubeDescription: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categories: any[];
}

export default function Index(props: CreateProfileProps) {
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return (
    <div className="w-full">
      <PageContainer>
        <Steps />

        <StepContainer>
          <TopBar noOnboardedFriends noLogo noConnectWallet noTokens />

          <StepSubContainer>
            <EditProfileForm
              description={props.youtubeDescription}
              categories={props.categories}
              buttonText="next"
              route="/submit/connect-wallet"
              title="create profile"
            />

            <ChannelBox
              banner={props.bannerImage}
              title={props.title}
              description={props.youtubeDescription}
            />
          </StepSubContainer>
        </StepContainer>
      </PageContainer>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const session = await getSession({ req });
    const { account, profile } = await fetchSessionData(session);

    if (!account || !profile) {
      return {
        redirect: {
          destination: '/submit/connect',
          permanent: false,
        },
      };
    }

    if (profile.attributes.handle && profile.attributes.waitlist) {
      return {
        redirect: {
          destination: '/submit/connect-wallet',
          permanent: false,
        },
      };
    }

    const categories = await readCategories();

    return {
      props: {
        bannerImage: profile.attributes.banner_image,
        title: profile.attributes.title,
        youtubeDescription: profile.attributes.youtube_description,
        categories,
      },
    };
  } catch (error) {
    console.error(error.message);

    return {
      props: {
        bannerImage: '',
        title: '',
        youtubeDescription: '',
        categories: [],
      },
    };
  }
};
