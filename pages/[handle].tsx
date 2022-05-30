import EditProfileModal from '@components/EditProfileModal';
import Footer from '@components/Footer';
import MainTopBar from '@components/MainTopBar';
import MobileMainMenu from '@components/MobileMainMenu';
import MobileProfileVideos from '@components/MobileProfileVideos';
import ProfileDistributions from '@components/ProfileDistributions';
import ProfileMediaKit from '@components/ProfileMediaKit';
import ProfileServices from '@components/ProfileServices';
import ProfileVideos from '@components/ProfileVideos';
import StakeStepsModals from '@components/StakeStepsModals';
import { ErrorContext } from '@contexts/ErrorContext';
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
  youtubeSubscribers: number;
  description: string;
  tags: string[];
  youtubeChannelId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  videos: any[];
  isOwner: boolean;
  handle: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categories: any[];
  categoryName: string;
}

export default function Index({
  bannerImage,
  title,
  youtubeSubscribers,
  description,
  tags,
  youtubeChannelId,
  videos,
  isOwner,
  handle,
  categories,
  categoryName,
}: ProfileProps) {
  const { setError } = useContext(ErrorContext);
  const [editProfileModalIsOpen, setEditProfileModalIsOpen] = useState(false);
  const [stakeStepsModalsIsOpen, setStakeStepsModalsOpen] = useState(false);
  const [currentAccount, setCurrentAccount] = useState('');
  const { push } = useRouter();

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
        tags={tags}
        handle={handle}
        categories={categories}
        categoryName={categoryName}
      />

      <div className="flex flex-col">
        <Head>
          <title>cobogo - {title}</title>
        </Head>

        <MainTopBar
          connectWallet={connectMetaMaskWallet}
          currentAccount={currentAccount}
          setCurrentAccount={setCurrentAccount}
        />

        <MobileMainMenu
          connectWallet={connectMetaMaskWallet}
          currentAccount={currentAccount}
        />

        <ProfileMediaKit />

        <ProfileDistributions />

        <ProfileServices />

        <ProfileVideos videos={videos} />

        <MobileProfileVideos videos={videos} />

        <Footer />
      </div>
    </>
  );
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
        youtubeSubscribers: profile.attributes.youtube_subscribers,
        description: profile.attributes.description,
        tags: profile.attributes.categories.split(','),
        youtubeChannelId: profile.attributes.youtube_channel_id,
        videos,
        isOwner:
          session.user['id'] ===
          profile.attributes.accounts.data[0].attributes.youtube_account_id,
        handle: profile.attributes.handle,
        categories,
        categoryName: profile.attributes.category.data.attributes.name,
      },
    };
  } catch (error) {
    console.error(error.message);
  }
};
