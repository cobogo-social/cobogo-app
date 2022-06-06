import Blankslate from '@components/Blankslate';
import BlankslateContainer from '@components/BlankslateContainer';
import BlankslateTopBar from '@components/BlankslateTopBar';
import Footer from '@components/Footer';
import { ErrorContext } from '@contexts/ErrorContext';
import { LoadingContext } from '@contexts/LoadingContext';
import { readCategories, readProfileByHandle } from '@services/cobogoApi';
import { readVideosByChannelId } from '@services/youtubeApi';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';

// import MainTopBar from '@components/MainTopBar';
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
  const { setError } = useContext(ErrorContext);
  // const [editProfileModalIsOpen, setEditProfileModalIsOpen] = useState(false);
  // const [stakeStepsModalsIsOpen, setStakeStepsModalsOpen] = useState(false);
  const [currentWallet, setCurrentWallet] = useState('');
  const { push } = useRouter();
  const { setLoading } = useContext(LoadingContext);

  // function openStakeStepsModals() {
  //   setStakeStepsModalsOpen(true);
  // }

  // // TODO: remove duplicated functions based this
  // function openEditProfileModal() {
  //   setEditProfileModalIsOpen(true);
  // }

  const checkEthereum = useCallback(
    (showError = false) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { ethereum } = window as any;

      if (!ethereum) {
        if (showError) {
          setError(
            'Metamask is not available in thie browser. Please install Metamask to continue.',
          );
        }
        return;
      }

      return ethereum;
    },
    [setError],
  );

  const checkWallets = useCallback(
    async (ethereumWallets = null, method = 'eth_accounts') => {
      try {
        let ethereumAccounts = ethereumWallets;

        if (!ethereumAccounts) {
          const ethereum = checkEthereum();
          if (!ethereum) return;

          ethereumAccounts = await ethereum.request({
            method,
          });
        }

        if (ethereumAccounts.length <= 0) {
          setCurrentWallet('');
          return false;
        }

        const walletAddress = ethereumAccounts[0];
        await axios.post('/api/cobogo/createWallet', {
          walletAddress,
        });
        setCurrentWallet(walletAddress);
        return true;
      } catch (error) {
        setError(error.message);
      }
    },
    [setError, checkEthereum],
  );

  async function connectMetaMaskWallet() {
    try {
      if (!checkEthereum(true)) return;

      setLoading(true);
      await checkWallets(null, 'eth_requestAccounts');
      setLoading(false);
      push('/referral-dashboard');
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    const ethereum = checkEthereum();
    if (!ethereum) return;

    ethereum.on('accountsChanged', (ethereumAccounts) => {
      checkWallets(ethereumAccounts);
    });

    checkWallets();
  }, [checkWallets, checkEthereum]);

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return (
    <div className="w-full">
      <Head>
        <title>cobogo - {title}</title>
      </Head>

      <BlankslateContainer>
        <BlankslateTopBar
          setCurrentWallet={setCurrentWallet}
          currentWallet={currentWallet}
        />

        <Blankslate
          bannerImage={bannerImage}
          title={title}
          referralCode={referralCode}
          connectWallet={connectMetaMaskWallet}
          currentWallet={currentWallet}
        />
      </BlankslateContainer>

      <Footer />
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

  //       <MainTopBar
  //         connectWallet={connectMetaMaskWallet}
  //         currentWallet={currentWallet}
  //         setCurrentWallet={setCurrentWallet}
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

  //       <Footer />
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

    return {
      props: {
        bannerImage: profile.attributes.banner_image,
        title: profile.attributes.title,
        referralCode: profile.attributes.referral_code,
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
      props: {},
    };
  }
};
