import Blankslate from '@components/Blankslate';
import BlankslateContainer from '@components/BlankslateContainer';
import BlankslateTopBar from '@components/BlankslateTopBar';

import Footer from '@components/Footer';
// import MainTopBar from '@components/MainTopBar';
import MobileMainMenu from '@components/MobileMainMenu';
// import MobileProfileAbout from '@components/MobileProfileAbout';
// import MobileProfileChannelBanner from '@components/MobileProfileChannelBanner';
// import MobileProfileTopStakers from '@components/MobileProfileTopStakers';
// import MobileProfileVideos from '@components/MobileProfileVideos';
// import ProfileAbout from '@components/ProfileAbout';
// import ProfileChannelBanner from '@components/ProfileChannelBanner';
// import ProfileStatsBand from '@components/ProfileStatsBand';
// import ProfileTopStakers from '@components/ProfileTopStakers';
// import ProfileVideos from '@components/ProfileVideos';
// import StakeStepsModals from '@components/StakeStepsModals';
// import EditProfileModal from '@components/EditProfileModal';
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
  const [currentAccount, setCurrentAccount] = useState('');
  const { push } = useRouter();
  const { setLoading } = useContext(LoadingContext);

  // function openStakeStepsModals() {
  //   setStakeStepsModalsOpen(true);
  // }

  // // TODO: remove duplicated functions based this
  // function openEditProfileModal() {
  //   setEditProfileModalIsOpen(true);
  // }

  async function connectMetaMaskWallet() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { ethereum } = window as any;

      if (!ethereum) {
        return;
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      const address = accounts[0];

      setCurrentAccount(address);

      const createAccount = await axios.post(
        '/api/cobogo/createAccountToFanOrYoutuber',
        {
          name: address,
        },
      );

      if (createAccount.data.data) {
        await axios.post('/api/cobogo/createWallet', {
          address,
          account: createAccount.data.data.id,
        });

        push('/referral-dashboard');
      } else {
        push('/referral-dashboard');
      }
    } catch (error) {
      setError(error.message);
    }
  }

  const checkIfWalletIsConnected = useCallback(async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { ethereum } = window as any;

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        setCurrentAccount(account);
      }
    } catch (error) {
      setError(error.message);
    }
  }, [setError]);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [checkIfWalletIsConnected]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { ethereum } = window as any;

    ethereum.on('accountsChanged', (accounts) => {
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
      } else {
        setCurrentAccount('');
      }
    });
  }, []);

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
          setCurrentAccount={setCurrentAccount}
          currentAccount={currentAccount}
        />

        <MobileMainMenu
          connectWallet={connectMetaMaskWallet}
          currentAccount={currentAccount}
        />

        <Blankslate
          bannerImage={bannerImage}
          title={title}
          referralCode={referralCode}
          connectWallet={connectMetaMaskWallet}
          currentAccount={currentAccount}
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
  //         currentAccount={currentAccount}
  //         setCurrentAccount={setCurrentAccount}
  //       />

  //       <MobileMainMenu
  //         connectWallet={connectMetaMaskWallet}
  //         currentAccount={currentAccount}
  //       />

  //       <div className="h-[299px] w-full hidden sm:flex flex-col">
  //         <ProfileChannelBanner
  //           bannerImage={bannerImage}
  //           title={title}
  //           youtubeSubscribers={youtubeSubscribers}
  //         />

  //         <ProfileStatsBand openStakeStepsModals={openStakeStepsModals} />
  //       </div>

  //       <MobileProfileChannelBanner
  //         title={title}
  //         youtubeSubscribers={youtubeSubscribers}
  //         tags={tags}
  //         openStakeStepsModals={openStakeStepsModals}
  //         bannerImage={bannerImage}
  //       />

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

  //       <MobileProfileAbout
  //         isOwner={isOwner}
  //         description={description}
  //         youtubeChannelId={youtubeChannelId}
  //         openEditProfileModal={openEditProfileModal}
  //       />

  //       <MobileProfileTopStakers />

  //       <ProfileVideos videos={videos} title={title} />

  //       <MobileProfileVideos videos={videos} title={title} />

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
