import EditProfileModal from '@components/EditProfileModal';
import ErrorModal from '@components/ErrorModal';
import Footer from '@components/Footer';
import Loading from '@components/Loading';
import MainTopBar from '@components/MainTopBar';
import MobileMainMenu from '@components/MobileMainMenu';
import MobileProfileAbout from '@components/MobileProfileAbout';
import MobileProfileChannelBanner from '@components/MobileProfileChannelBanner';
import MobileProfileTopStakers from '@components/MobileProfileTopStakers';
import MobileProfileVideos from '@components/MobileProfileVideos';
import ProfileAbout from '@components/ProfileAbout';
import ProfileChannelBanner from '@components/ProfileChannelBanner';
import ProfileStatsBand from '@components/ProfileStatsBand';
import ProfileTopStakers from '@components/ProfileTopStakers';
import ProfileVideos from '@components/ProfileVideos';
import StakeStepsModals from '@components/StakeStepsModals';
import { readProfileByHandle } from '@services/cobogoApi';
import { readVideosByChannelId } from '@services/youtubeApi';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';

interface ProfileProps {
  bannerImage: string;
  title: string;
  youtubeSubscribers: number;
  description: string;
  categories: string[];
  youtubeChannelId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  videos: any[];
  isOwner: boolean;
  handle: string;
}

export default function Index({
  bannerImage,
  title,
  youtubeSubscribers,
  description,
  categories,
  youtubeChannelId,
  videos,
  isOwner,
  handle,
}: ProfileProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [editProfileModalIsOpen, setEditProfileModalIsOpen] = useState(false);
  const [stakeStepsModalsIsOpen, setStakeStepsModalsOpen] = useState(false);
  const [currentAccount, setCurrentAccount] = useState('');

  function openStakeStepsModals() {
    setStakeStepsModalsOpen(true);
  }

  // TODO: remove duplicated functions based this
  function openEditProfileModal() {
    setEditProfileModalIsOpen(true);
  }

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
    } catch (error) {
      console.error(error);
    }
  }

  const checkIfWalletIsConnected = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { ethereum } = window as any;

    try {
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        setCurrentAccount(account);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [checkIfWalletIsConnected]);

  return (
    <>
      <StakeStepsModals
        isOpen={stakeStepsModalsIsOpen}
        setIsOpen={setStakeStepsModalsOpen}
        title={title}
        description={description}
        bannerImage={bannerImage}
      />
      <EditProfileModal
        isOpen={editProfileModalIsOpen}
        setIsOpen={setEditProfileModalIsOpen}
        description={description}
        categories={categories}
        handle={handle}
        setIsLoading={setIsLoading}
        setIsError={setIsError}
      />
      <Loading isLoading={isLoading} />
      <ErrorModal isOpen={isError} setIsOpen={setIsError} />

      <div className="flex flex-col">
        <Head>
          <title>cobogo - {title}</title>
        </Head>

        <MainTopBar />

        <MobileMainMenu
          connectWallet={connectMetaMaskWallet}
          currentAccount={currentAccount}
        />

        <div className="h-[299px] w-full hidden sm:flex flex-col">
          <ProfileChannelBanner
            bannerImage={bannerImage}
            title={title}
            youtubeSubscribers={youtubeSubscribers}
          />

          <ProfileStatsBand openStakeStepsModals={openStakeStepsModals} />
        </div>

        <MobileProfileChannelBanner
          title={title}
          youtubeSubscribers={youtubeSubscribers}
          categories={categories}
          openStakeStepsModals={openStakeStepsModals}
          bannerImage={bannerImage}
        />

        <div className="w-full pt-[62px] px-[147px] hidden sm:flex justify-between items-start">
          <ProfileAbout
            description={description}
            categories={categories}
            youtubeChannelId={youtubeChannelId}
            isOwner={isOwner}
            openEditProfileModal={openEditProfileModal}
          />

          <ProfileTopStakers />
        </div>

        <MobileProfileAbout
          isOwner={isOwner}
          description={description}
          youtubeChannelId={youtubeChannelId}
          openEditProfileModal={openEditProfileModal}
        />

        <MobileProfileTopStakers />

        <ProfileVideos videos={videos} title={title} />

        <MobileProfileVideos videos={videos} title={title} />

        <Footer />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
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

  return {
    props: {
      bannerImage: profile.attributes.banner_image,
      title: profile.attributes.title,
      youtubeSubscribers: profile.attributes.youtube_subscribers,
      description: profile.attributes.description,
      categories: profile.attributes.categories.split(','),
      youtubeChannelId: profile.attributes.youtube_channel_id,
      videos,
      isOwner:
        session.user['id'] ===
        profile.attributes.accounts.data[0].attributes.youtube_account_id,
      handle: profile.attributes.handle,
    },
  };
};
