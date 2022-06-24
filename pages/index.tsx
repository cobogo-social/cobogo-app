import ChannelsCategoriesMenu from '@components/ChannelsCategoriesMenu';
import ChannelsChannelBanner from '@components/ChannelsChannelBanner';
import ChannelsChannelBox from '@components/ChannelsChannelBox';
import ChannelsFilterSelect from '@components/ChannelsFilterSelect';
import ChannelsSearchInput from '@components/ChannelsSearchInput';
import TopBar from '@components/TopBar';
import { MesssageContext } from '@contexts/MessageContext';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

// import { readCategories, readProfiles } from '@services/cobogoApi';
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
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [updatedChannels, setUpdatedChannels] = useState(channels);
  const { setMessage } = useContext(MesssageContext);

  const filteredChannels = useMemo(() => {
    const lowerSearch = search.toLowerCase();

    return updatedChannels.filter((channel) =>
      channel.attributes.title.toLowerCase().includes(lowerSearch),
    );
  }, [search, updatedChannels]);

  const readProfilesByPage = useCallback(async () => {
    try {
      setLoading(true);

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

        setLoading(false);
      }
    } catch (error) {
      setMessage({
        text: error.message,
        type: 'error',
      });
    }
  }, [page, setMessage]);

  async function searchByCategory(categoryId) {
    try {
      setLoading(true);

      await axios
        .get('/api/cobogo/readProfileByCategory', {
          params: {
            categoryId,
          },
        })
        .then((response) => {
          setUpdatedChannels(response.data.data);
        });

      setLoading(false);
    } catch (error) {
      setMessage({
        text: error.message,
        type: 'error',
      });
    }
  }

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

  return (
    <div className="flex flex-col">
      <TopBar categories={categories} searchByCategory={searchByCategory} />

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

          <div id="sentinel" className="mt-[30px]">
            {loading && (
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
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session?.user) {
    return {
      redirect: {
        destination: '/submit/connect',
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: '/submit',
      permanent: false,
    },
  };

  // Comentado para poder fazer deploy pra produção e deixar a home redirecionando para o submit.

  // try {
  //   const profiles = await readProfiles(1);

  //   const categories = await readCategories();

  //   return {
  //     props: {
  //       bannerImage: profiles[0] ? profiles[0].attributes.banner_image : null,
  //       title: profiles[0] ? profiles[0].attributes.title : '',
  //       description: profiles[0]
  //         ? profiles[0].attributes.youtube_description
  //         : '',
  //       youtubeChannelId: profiles[0]
  //         ? profiles[0].attributes.youtube_channel_id
  //         : null,
  //       handle: profiles[0] ? profiles[0].attributes.handle : null,
  //       channels: profiles,
  //       categories,
  //     },
  //   };
  // } catch (error) {
  //   console.error(error.message);

  //   return {
  //     props: {
  //       bannerImage: '',
  //       title: '',
  //       description: '',
  //       youtubeChannelId: '',
  //       handle: '',
  //       channels: [],
  //       categories: [],
  //     },
  //   };
  // }
};
