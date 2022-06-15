import Blankslate from '@components/Blankslate';
import BlankslateContainer from '@components/BlankslateContainer';
import TopBar from '@components/TopBar';
import { LoadingContext } from '@contexts/LoadingContext';
import {
  fetchSessionData,
  readAccountsByReferralId,
  readCategories,
  readProfileByHandle,
} from '@services/cobogoApi';
import { readVideosByChannelId } from '@services/youtubeApi';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { useContext, useEffect } from 'react';

// import TopBar from '@components/TopBar';
// import ProfileAbout from '@components/ProfileAbout';
// import ProfileChannelBanner from '@components/ProfileChannelBanner';
// import ProfileStatsBand from '@components/ProfileStatsBand';
// import ProfileTopStakers from '@components/ProfileTopStakers';
// import ProfileVideos from '@components/ProfileVideos';
// import StakeStepsModals from '@components/StakeStepsModals';
// import EditProfileModal from '@components/EditProfileModal';

interface ProfileProps {
  bannerImage: string;
  title: string;
  referralCode: string;
  // youtubeSubscribers: number;
  // description: string;
  // tags: string[];
  // youtubeChannelId: string;
  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // videos: any[];
  // isOwner: boolean;
  // handle: string;
  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // categories: any[];
  // categoryName: string;
}

export default function Index({
  // youtubeSubscribers,
  // description,
  // tags,
  // youtubeChannelId,
  // videos,
  // isOwner,
  // handle,
  // categories,
  // categoryName,
  bannerImage,
  title,
  referralCode,
}: ProfileProps) {
  // const [editProfileModalIsOpen, setEditProfileModalIsOpen] = useState(false);
  // const [stakeStepsModalsIsOpen, setStakeStepsModalsOpen] = useState(false);
  const { setLoading } = useContext(LoadingContext);

  // function openStakeStepsModals() {
  //   setStakeStepsModalsOpen(true);
  // }

  // function openEditProfileModal() {
  //   setEditProfileModalIsOpen(true);
  // }

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return (
    <div className="w-full">
      <Head>
        <title>cobogo - {title}</title>
      </Head>

      <BlankslateContainer>
        <TopBar />

        <Blankslate
          bannerImage={bannerImage}
          title={title}
          referralCode={referralCode}
        />
      </BlankslateContainer>
    </div>
  );

  // return (
  //   <>
  //     <StakeStepsModals
  //       isOpen={stakeStepsModalsIsOpen}
  //       setIsOpen={setStakeStepsModalsOpen}
  //       title={title}
  //       description={description}
  //       bannerImage={bannerImage}
  //     />
  //     <EditProfileModal
  //       isOpen={editProfileModalIsOpen}
  //       setIsOpen={setEditProfileModalIsOpen}
  //       description={description}
  //       tags={tags}
  //       handle={handle}
  //       categories={categories}
  //       categoryName={categoryName}
  //     />

  //     <div className="flex flex-col">
  //       <Head>
  //         <title>cobogo - {title}</title>
  //       </Head>

  //       <TopBar
  //       />

  //       <div className="h-[299px] w-full hidden sm:flex flex-col">
  //         <ProfileChannelBanner
  //           bannerImage={bannerImage}
  //           title={title}
  //           youtubeSubscribers={youtubeSubscribers}
  //         />

  //         <ProfileStatsBand openStakeStepsModals={openStakeStepsModals} />
  //       </div>

  //       <div className="w-full pt-[62px] px-[147px] hidden sm:flex justify-between items-start">
  //         <ProfileAbout
  //           description={description}
  //           tags={tags}
  //           youtubeChannelId={youtubeChannelId}
  //           isOwner={isOwner}
  //           openEditProfileModal={openEditProfileModal}
  //         />

  //         <ProfileTopStakers />
  //       </div>

  //       <ProfileVideos videos={videos} title={title} />

  //     </div>
  //   </>
  // );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  try {
    const session = await getSession({ req });
    const { handle } = params;
    const { account } = await fetchSessionData(session);

    const profile = await readProfileByHandle(handle);

    if (!profile) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    // TODO: Criar relação entre Video e Profile e pegar os videos automaticamente pelo Profile sem precisar fazer essa chamada adicional.
    const videos = await readVideosByChannelId(
      profile.attributes.youtube_channel_id,
    );

    const categories = await readCategories();

    let onboardedFriends = 0;

    const accountsByReferralId = await readAccountsByReferralId(account.id);

    accountsByReferralId.forEach((accountByReferralId) => {
      const waitlisted =
        accountByReferralId.attributes.profiles.data[0].attributes.waitlist;

      if (waitlisted) {
        onboardedFriends += 1;
      }
    });

    return {
      props: {
        bannerImage: profile.attributes.banner_image,
        title: profile.attributes.title,
        referralCode: profile.attributes.referral_code,
        onboardedFriends,
        tokens: account.attributes.tokens,
        youtubeSubscribers: profile.attributes.youtube_subscribers,
        description: profile.attributes.description,
        tags: profile.attributes.categories.split(','),
        youtubeChannelId: profile.attributes.youtube_channel_id,
        videos,
        isOwner: session?.user
          ? session.user['id'] ===
            profile.attributes.accounts.data[0].attributes.youtube_account_id
          : false,
        handle: profile.attributes.handle,
        categories,
        categoryName: profile.attributes.category.data.attributes.name,
      },
    };
  } catch (error) {
    console.error(error.message);

    return {
      props: {
        bannerImage: '',
        title: '',
        referralCode: '',
        onboardedFriends: 0,
        tokens: 0,
        youtubeSubscribers: 0,
        description: '',
        tags: [],
        youtubeChannelId: '',
        videos: [],
        isOwner: false,
        handle: '',
        categories: [],
        categoryName: '',
      },
    };
  }
};
