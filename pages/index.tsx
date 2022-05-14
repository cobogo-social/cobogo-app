import ChannelsCategoriesMenu from '@components/ChannelsCategoriesMenu';
import ChannelsChannelBanner from '@components/ChannelsChannelBanner';
import ChannelsChannelBox from '@components/ChannelsChannelBox';
import ChannelsFilterSelect from '@components/ChannelsFilterSelect';
import ChannelsSearchInput from '@components/ChannelsSearchInput';
import Footer from '@components/Footer';
import MainTopBar from '@components/MainTopBar';
import MobileChannelsChannelBox from '@components/MobileChannelsChannelBox';
import MobileMainMenu from '@components/MobileMainMenu';
import { readCategories, readProfiles } from '@services/cobogoApi';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface ChannelsProps {
  bannerImage: string;
  title: string;
  description: string;
  youtubeChannelId: string;
  handle: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  channels: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categories: any[];
}

export default function Index({
  bannerImage,
  title,
  description,
  youtubeChannelId,
  handle,
  channels,
  categories,
}: ChannelsProps) {
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [updatedChannels, setUpdatedChannels] = useState(channels);
  const [currentAccount, setCurrentAccount] = useState('');

  const filteredChannels = useMemo(() => {
    const lowerSearch = search.toLowerCase();

    return updatedChannels.filter((channel) =>
      channel.attributes.title.toLowerCase().includes(lowerSearch),
    );
  }, [search, updatedChannels]);

  const readProfilesByPage = useCallback(async () => {
    setIsLoading(true);

    if (page >= 2) {
      await axios
        .get('/api/cobogo/readProfiles', {
          params: {
            page,
          },
        })
        .then((response) => {
          response.data.data.forEach((channel) => {
            setUpdatedChannels((c) => [...c, channel]);
          });
        });

      setIsLoading(false);
    }
  }, [page]);

  async function searchByCategory(categoryId) {
    setIsLoading(true);

    await axios
      .get('/api/cobogo/readProfileByCategory', {
        params: {
          categoryId,
        },
      })
      .then((response) => {
        setUpdatedChannels(response.data.data);
      });

    setIsLoading(false);
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
    const intersectionObserver = new IntersectionObserver(async (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setPage((c) => c + 1);
      }
    });

    intersectionObserver.observe(document.querySelector('#sentinel'));

    return () => intersectionObserver.disconnect();
  }, []);

  useEffect(() => {
    readProfilesByPage();
  }, [page, readProfilesByPage]);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [checkIfWalletIsConnected]);

  return (
    <div className="flex flex-col">
      <MainTopBar
        connectWallet={connectMetaMaskWallet}
        currentAccount={currentAccount}
        setCurrentAccount={setCurrentAccount}
      />

      <MobileMainMenu
        connectWallet={connectMetaMaskWallet}
        currentAccount={currentAccount}
        categories={categories}
        searchByCategory={searchByCategory}
      />

      <ChannelsChannelBanner
        bannerImage={bannerImage}
        title={title}
        description={description}
        youtubeChannelId={youtubeChannelId}
        handle={handle}
      />

      <div className="flex">
        <ChannelsCategoriesMenu
          categories={categories}
          searchByCategory={searchByCategory}
        />

        <div className="w-full px-[100px] py-[40px] flex flex-col justify-start items-center">
          <div className="flex flex-col sm:flex-row max-w-[771px]">
            <div className="mb-[10px] sm:mb-0 sm:mr-[30px] mt-[52px] sm:mt-0">
              <ChannelsSearchInput search={search} setSearch={setSearch} />
            </div>

            <ChannelsFilterSelect />
          </div>

          {filteredChannels.map((channel) => (
            <ChannelsChannelBox
              key={channel.id}
              bannerImage={channel.attributes.banner_image}
              title={channel.attributes.title}
              description={channel.attributes.youtube_description}
              handle={channel.attributes.handle}
            />
          ))}

          {filteredChannels.map((channel) => (
            <MobileChannelsChannelBox
              key={channel.id}
              bannerImage={channel.attributes.banner_image}
              title={channel.attributes.title}
              description={channel.attributes.youtube_description}
              handle={channel.attributes.handle}
            />
          ))}

          <div id="sentinel" className="mt-[30px]">
            {isLoading && (
              <Image
                src="/images/loading-icon.svg"
                width={107}
                height={27}
                alt="loading icon"
              />
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const profiles = await readProfiles(1);

  const categories = await readCategories();

  return {
    props: {
      bannerImage: profiles[0] ? profiles[0].attributes.banner_image : null,
      title: profiles[0] ? profiles[0].attributes.title : '',
      description: profiles[0]
        ? profiles[0].attributes.youtube_description
        : '',
      youtubeChannelId: profiles[0]
        ? profiles[0].attributes.youtube_channel_id
        : null,
      handle: profiles[0] ? profiles[0].attributes.handle : null,
      channels: profiles,
      categories,
    },
  };
};
