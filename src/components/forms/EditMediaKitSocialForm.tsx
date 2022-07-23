import Button from '@components/Button';
import { LoadingContext } from '@contexts/LoadingContext';
import { MessageContext } from '@contexts/MessageContext';
import axios from 'axios';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

interface EditMediaKitSocialFormProps {
  buttonText: string;
  youtubeSubscribers: number;
  youtubeVideos: number;
  youtubeViews: number;
  youtubeUniqueViewers: number;
  youtubeWatchTimeHours: number;
  youtubeAvgViewDuration: number;
  instagramHandle: string;
  instagramFollowers: number;
  instagramImpressions: number;
  instagramStoriesAvgViews: number;
  instagramPostsAvgLikes: number;
  instagramReelsAvgViews: number;
  twitchHandle: string;
  twitchSubscribers: number;
  twitchVideos: number;
  twitchAvgViewers: number;
  twitchPeakViewers: number;
  twitchWatchTimeHours: number;
  tiktokHandle: string;
  tiktokFollowers: number;
  tiktokViews: number;
  tiktokLikes: number;
  tiktokComments: number;
  tiktokShares: number;
  discordHandle: string;
  discordMembers: number;
  telegramHandle: string;
  telegramMembers: number;
  twitterHandle: string;
  twitterFollowers: number;
  route?: string;
  handle: string;
  closeModal: () => void;
  socialName: string;
}

export default function EditMediaKitSocialForm(
  props: EditMediaKitSocialFormProps,
) {
  const [sectionIsOpen, setSectionIsOpen] = useState('');

  const { push } = useRouter();

  const { setMessage } = useContext(MessageContext);
  const { setLoading } = useContext(LoadingContext);

  const formik = useFormik({
    initialValues: {
      youtubeSubscribers: props.youtubeSubscribers,
      youtubeVideos: props.youtubeVideos,
      youtubeViews: props.youtubeViews,
      youtubeUniqueViewers: props.youtubeUniqueViewers,
      youtubeWatchTimeHours: props.youtubeWatchTimeHours,
      youtubeAvgViewDuration: props.youtubeAvgViewDuration,
      instagramHandle: props.instagramHandle,
      instagramFollowers: props.instagramFollowers,
      instagramImpressions: props.instagramImpressions,
      instagramStoriesAvgViews: props.instagramStoriesAvgViews,
      instagramPostsAvgLikes: props.instagramPostsAvgLikes,
      instagramReelsAvgViews: props.instagramReelsAvgViews,
      twitchHandle: props.twitchHandle,
      twitchSubscribers: props.twitchSubscribers,
      twitchVideos: props.twitchVideos,
      twitchAvgViewers: props.twitchAvgViewers,
      twitchPeakViewers: props.twitchPeakViewers,
      twitchWatchTimeHours: props.twitchWatchTimeHours,
      tiktokHandle: props.tiktokHandle,
      tiktokFollowers: props.tiktokFollowers,
      tiktokViews: props.tiktokViews,
      tiktokLikes: props.tiktokLikes,
      tiktokComments: props.tiktokComments,
      tiktokShares: props.tiktokShares,
      discordHandle: props.discordHandle,
      discordMembers: props.discordMembers,
      telegramHandle: props.telegramHandle,
      telegramMembers: props.telegramMembers,
      twitterHandle: props.twitterHandle,
      twitterFollowers: props.twitterFollowers,
    },

    onSubmit: async (values) => {
      try {
        setLoading(true);

        await axios
          .post('/api/cobogo/updateProfile', {
            youtubeSubscribers: values.youtubeSubscribers,
            youtubeVideos: values.youtubeVideos,
            youtubeViews: values.youtubeViews,
            youtubeUniqueViewers: values.youtubeUniqueViewers,
            youtubeWatchTimeHours: values.youtubeWatchTimeHours,
            youtubeAvgViewDuration: values.youtubeAvgViewDuration,
            instagramHandle: values.instagramHandle,
            instagramFollowers: values.instagramFollowers,
            instagramImpressions: values.instagramImpressions,
            instagramStoriesAvgViews: values.instagramStoriesAvgViews,
            instagramPostsAvgLikes: values.instagramPostsAvgLikes,
            instagramReelsAvgViews: values.instagramReelsAvgViews,
            twitchHandle: values.twitchHandle,
            twitchSubscribers: values.twitchSubscribers,
            twitchVideos: values.twitchVideos,
            twitchAvgViewers: values.twitchAvgViewers,
            twitchPeakViewers: values.twitchPeakViewers,
            twitchWatchTimeHours: values.twitchWatchTimeHours,
            tiktokHandle: values.tiktokHandle,
            tiktokFollowers: values.tiktokFollowers,
            tiktokViews: values.tiktokViews,
            tiktokLikes: values.tiktokLikes,
            tiktokComments: values.tiktokComments,
            tiktokShares: values.tiktokShares,
            discordHandle: values.discordHandle,
            discordMembers: values.discordMembers,
            telegramHandle: values.telegramHandle,
            telegramMembers: values.telegramMembers,
            twitterHandle: values.twitterHandle,
            twitterFollowers: values.twitterFollowers,
          })
          .then(async (response) => {
            if (response.data.error) {
              setMessage({
                text: response.data.error,
                type: 'error',
              });
            } else {
              await push(props.route ? props.route : `/${props.handle}`);
            }

            if (props.closeModal) {
              props.closeModal();
            }

            setLoading(false);
          });
      } catch (error) {
        setLoading(false);

        setMessage({
          text: error.message,
          type: 'error',
        });
      }
    },
  });

  function openSection(sectionName: string) {
    if (sectionIsOpen === sectionName) {
      setSectionIsOpen('');
    } else {
      setSectionIsOpen(sectionName);
    }
  }

  function validateKeyPressed(event) {
    const keyPressed = event.key;

    if (keyPressed === 'Enter') {
      event.preventDefault();
    }
  }

  function request(event: { key: string }) {
    if (event.key === 'Enter') {
      return;
    }
  }

  useEffect(() => {
    if (props.socialName) {
      openSection(props.socialName);
    }
  }, []);

  return (
    <form className="flex flex-col w-full" onSubmit={formik.handleSubmit}>
      <p className="text-white text-[40px] mb-6">media kit - social</p>

      <div
        onClick={() => openSection('youtube')}
        className="flex items-center mb-5 hover:cursor-pointer"
      >
        <div className="flex mr-[10px]">
          <Image
            src="/images/ytb-icon.svg"
            width={30}
            height={21}
            alt="youtube icon"
          />
        </div>

        <p className="text-white text-[22px] mr-[10px]">YouTube</p>

        <div className="w-full border border-gray10 mr-[10px]" />

        <div className="flex">
          <Image
            src="/images/open-icon.svg"
            width={12}
            height={7}
            alt="open icon"
          />
        </div>
      </div>

      {sectionIsOpen === 'youtube' && (
        <div>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <label
                htmlFor="handle"
                className="text-sm sm:text-lg sm:mb-2 font-bold"
              >
                subscribers
              </label>

              <input
                id="youtubeSubscribers"
                name="youtubeSubscribers"
                type="number"
                onChange={formik.handleChange}
                onKeyPress={validateKeyPressed}
                value={formik.values.youtubeSubscribers}
                disabled
                className="w-[150px] sm:w-[205px] h-12 bg-gray7 border border-gray10 mb-5 p-2 outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="handle"
                className="text-sm sm:text-lg sm:mb-2 font-bold"
              >
                videos
              </label>

              <input
                id="youtubeVideos"
                name="youtubeVideos"
                type="number"
                onChange={formik.handleChange}
                onKeyPress={validateKeyPressed}
                value={formik.values.youtubeVideos}
                className="w-[150px] sm:w-[205px] h-12 bg-gray7 border border-gray10 mb-5 p-2 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col">
              <label
                htmlFor="handle"
                className="text-sm sm:text-lg sm:mb-2 font-bold"
              >
                views
              </label>

              <input
                id="youtubeViews"
                name="youtubeViews"
                type="number"
                onChange={formik.handleChange}
                onKeyPress={validateKeyPressed}
                value={formik.values.youtubeViews}
                className="w-[150px] sm:w-[205px] h-12 bg-gray7 border border-gray10 mb-5 p-2 outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="handle"
                className="text-sm sm:text-lg sm:mb-2 font-bold"
              >
                unique viewers
              </label>

              <input
                id="youtubeUniqueViewers"
                name="youtubeUniqueViewers"
                type="number"
                onChange={formik.handleChange}
                onKeyPress={validateKeyPressed}
                value={formik.values.youtubeUniqueViewers}
                className="w-[150px] sm:w-[205px] h-12 bg-gray7 border border-gray10 mb-5 p-2 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col">
              <label
                htmlFor="handle"
                className="text-sm sm:text-lg sm:mb-2 font-bold"
              >
                watch time hours
              </label>

              <input
                id="youtubeWatchTimeHours"
                name="youtubeWatchTimeHours"
                type="number"
                onChange={formik.handleChange}
                onKeyPress={validateKeyPressed}
                value={formik.values.youtubeWatchTimeHours}
                className="w-[150px] sm:w-[205px] h-12 bg-gray7 border border-gray10 mb-10 p-2 outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="handle"
                className="text-sm sm:text-lg sm:mb-2 font-bold"
              >
                average view duration
              </label>

              <input
                id="youtubeAvgViewDuration"
                name="youtubeAvgViewDuration"
                type="number"
                onChange={formik.handleChange}
                onKeyPress={validateKeyPressed}
                value={formik.values.youtubeAvgViewDuration}
                className="w-[150px] sm:w-[205px] h-12 bg-gray7 border border-gray10 mb-10 p-2 outline-none"
              />
            </div>
          </div>
        </div>
      )}

      <div
        onClick={() => openSection('instagram')}
        className="flex items-center mb-5 hover:cursor-pointer"
      >
        <div className="flex mr-[10px]">
          <Image
            src="/images/instagram-icon.svg"
            width={30}
            height={25}
            alt="instagram icon"
          />
        </div>

        <p className="text-white text-[22px] mr-[10px]">Instagram</p>

        <div className="w-full border border-gray10 mr-[10px]" />

        <div className="flex">
          <Image
            src="/images/open-icon.svg"
            width={12}
            height={7}
            alt="open icon"
          />
        </div>
      </div>

      {sectionIsOpen === 'instagram' && (
        <div className="flex flex-col">
          <label
            htmlFor="handle"
            className="text-sm sm:text-lg sm:mb-2 font-bold"
          >
            handle
          </label>

          <div className="flex mb-5">
            <div className="px-4 h-12 bg-secondary hidden sm:flex justify-center items-center border border-r-0 border-gray10">
              <p className="font-bold">instagram.com/</p>
            </div>

            <div className="relative w-full">
              <input
                id="instagramHandle"
                name="instagramHandle"
                type="text"
                onChange={formik.handleChange}
                onKeyPress={validateKeyPressed}
                value={formik.values.instagramHandle}
                className="w-full h-12 bg-gray7 border sm:border-l-0 border-gray10 p-2 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col">
              <label
                htmlFor="handle"
                className="text-sm sm:text-lg sm:mb-2 font-bold"
              >
                followers
              </label>

              <input
                id="instagramFollowers"
                name="instagramFollowers"
                type="number"
                onChange={formik.handleChange}
                onKeyPress={validateKeyPressed}
                value={formik.values.instagramFollowers}
                disabled={!formik.values.instagramHandle}
                className="w-[150px] sm:w-[205px] h-12 bg-gray7 border border-gray10 mb-5 p-2 outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="handle"
                className="text-sm sm:text-lg sm:mb-2 font-bold"
              >
                impressions
              </label>

              <input
                id="instagramImpressions"
                name="instagramImpressions"
                type="number"
                onChange={formik.handleChange}
                onKeyPress={validateKeyPressed}
                value={formik.values.instagramImpressions}
                disabled={!formik.values.instagramHandle}
                className="w-[150px] sm:w-[205px] h-12 bg-gray7 border border-gray10 mb-5 p-2 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col">
              <label
                htmlFor="handle"
                className="text-sm sm:text-lg sm:mb-2 font-bold"
              >
                stories average views
              </label>

              <input
                id="instagramStoriesAvgViews"
                name="instagramStoriesAvgViews"
                type="number"
                onChange={formik.handleChange}
                onKeyPress={validateKeyPressed}
                value={formik.values.instagramStoriesAvgViews}
                disabled={!formik.values.instagramHandle}
                className="w-[150px] sm:w-[205px] h-12 bg-gray7 border border-gray10 mb-5 p-2 outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="handle"
                className="text-sm sm:text-lg sm:mb-2 font-bold"
              >
                posts average likes
              </label>

              <input
                id="instagramPostsAvgLikes"
                name="instagramPostsAvgLikes"
                type="number"
                onChange={formik.handleChange}
                onKeyPress={validateKeyPressed}
                value={formik.values.instagramPostsAvgLikes}
                disabled={!formik.values.instagramHandle}
                className="w-[150px] sm:w-[205px] h-12 bg-gray7 border border-gray10 mb-5 p-2 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col">
              <label
                htmlFor="handle"
                className="text-sm sm:text-lg sm:mb-2 font-bold"
              >
                reels average views
              </label>

              <input
                id="instagramReelsAvgViews"
                name="instagramReelsAvgViews"
                type="number"
                onChange={formik.handleChange}
                onKeyPress={validateKeyPressed}
                value={formik.values.instagramReelsAvgViews}
                disabled={!formik.values.instagramHandle}
                className="w-[150px] sm:w-[205px] h-12 bg-gray7 border border-gray10 mb-10 p-2 outline-none"
              />
            </div>
          </div>
        </div>
      )}

      <div
        onClick={() => openSection('twitch')}
        className="flex items-center mb-5 hover:cursor-pointer"
      >
        <div className="flex mr-[10px]">
          <Image
            src="/images/twitch-icon.svg"
            width={30}
            height={27}
            alt="twitch icon"
          />
        </div>

        <p className="text-white text-[22px] mr-[10px]">Twitch</p>

        <div className="w-full border border-gray10 mr-[10px]" />

        <div className="flex">
          <Image
            src="/images/open-icon.svg"
            width={12}
            height={7}
            alt="open icon"
          />
        </div>
      </div>

      {sectionIsOpen === 'twitch' && (
        <div className="flex flex-col">
          <label
            htmlFor="handle"
            className="text-sm sm:text-lg sm:mb-2 font-bold"
          >
            handle
          </label>

          <div className="flex mb-5">
            <div className="px-4 h-12 bg-secondary hidden sm:flex justify-center items-center border border-r-0 border-gray10">
              <p className="font-bold">twitch.tv/</p>
            </div>

            <div className="relative w-full">
              <input
                id="twitchHandle"
                name="twitchHandle"
                type="text"
                onChange={formik.handleChange}
                onKeyPress={validateKeyPressed}
                value={formik.values.twitchHandle}
                className="w-full h-12 bg-gray7 border sm:border-l-0 border-gray10 p-2 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col">
              <label
                htmlFor="handle"
                className="text-sm sm:text-lg sm:mb-2 font-bold"
              >
                subscribers
              </label>

              <input
                id="twitchSubscribers"
                name="twitchSubscribers"
                type="number"
                onChange={formik.handleChange}
                onKeyPress={validateKeyPressed}
                value={formik.values.twitchSubscribers}
                disabled={!formik.values.twitchHandle}
                className="w-[150px] sm:w-[205px] h-12 bg-gray7 border border-gray10 mb-5 p-2 outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="handle"
                className="text-sm sm:text-lg sm:mb-2 font-bold"
              >
                videos
              </label>

              <input
                id="twitchVideos"
                name="twitchVideos"
                type="number"
                onChange={formik.handleChange}
                onKeyPress={validateKeyPressed}
                value={formik.values.twitchVideos}
                disabled={!formik.values.twitchHandle}
                className="w-[150px] sm:w-[205px] h-12 bg-gray7 border border-gray10 mb-5 p-2 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col">
              <label
                htmlFor="handle"
                className="text-sm sm:text-lg sm:mb-2 font-bold"
              >
                average viewers
              </label>

              <input
                id="twitchAvgViewers"
                name="twitchAvgViewers"
                type="number"
                onChange={formik.handleChange}
                onKeyPress={validateKeyPressed}
                value={formik.values.twitchAvgViewers}
                disabled={!formik.values.twitchHandle}
                className="w-[150px] sm:w-[205px] h-12 bg-gray7 border border-gray10 mb-5 p-2 outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="handle"
                className="text-sm sm:text-lg sm:mb-2 font-bold"
              >
                peak viewers
              </label>

              <input
                id="twitchPeakViewers"
                name="twitchPeakViewers"
                type="number"
                onChange={formik.handleChange}
                onKeyPress={validateKeyPressed}
                value={formik.values.twitchPeakViewers}
                disabled={!formik.values.twitchHandle}
                className="w-[150px] sm:w-[205px] h-12 bg-gray7 border border-gray10 mb-5 p-2 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col">
              <label
                htmlFor="handle"
                className="text-sm sm:text-lg sm:mb-2 font-bold"
              >
                watch time hours
              </label>

              <input
                id="twitchWatchTimeHours"
                name="twitchWatchTimeHours"
                type="number"
                onChange={formik.handleChange}
                onKeyPress={validateKeyPressed}
                value={formik.values.twitchWatchTimeHours}
                disabled={!formik.values.twitchHandle}
                className="w-[150px] sm:w-[205px] h-12 bg-gray7 border border-gray10 mb-10 p-2 outline-none"
              />
            </div>
          </div>
        </div>
      )}

      <div
        onClick={() => openSection('tiktok')}
        className="flex items-center mb-5 hover:cursor-pointer"
      >
        <div className="flex mr-[10px]">
          <Image
            src="/images/tiktok-icon.svg"
            width={30}
            height={26}
            alt="tiktok icon"
          />
        </div>

        <p className="text-white text-[22px] mr-[10px]">TikTok</p>

        <div className="w-full border border-gray10 mr-[10px]" />

        <div className="flex">
          <Image
            src="/images/open-icon.svg"
            width={12}
            height={7}
            alt="open icon"
          />
        </div>
      </div>

      {sectionIsOpen === 'tiktok' && (
        <div className="flex flex-col">
          <label
            htmlFor="handle"
            className="text-sm sm:text-lg sm:mb-2 font-bold"
          >
            handle
          </label>

          <div className="flex mb-5">
            <div className="px-4 h-12 bg-secondary hidden sm:flex justify-center items-center border border-r-0 border-gray10">
              <p className="font-bold">tiktok.com/</p>
            </div>

            <div className="relative w-full">
              <input
                id="tiktokHandle"
                name="tiktokHandle"
                type="text"
                onChange={formik.handleChange}
                onKeyPress={validateKeyPressed}
                value={formik.values.tiktokHandle}
                className="w-full h-12 bg-gray7 border sm:border-l-0 border-gray10 p-2 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col">
              <label
                htmlFor="handle"
                className="text-sm sm:text-lg sm:mb-2 font-bold"
              >
                followers
              </label>

              <input
                id="tiktokFollowers"
                name="tiktokFollowers"
                type="number"
                onChange={formik.handleChange}
                onKeyPress={validateKeyPressed}
                value={formik.values.tiktokFollowers}
                disabled={!formik.values.tiktokHandle}
                className="w-[150px] sm:w-[205px] h-12 bg-gray7 border border-gray10 mb-5 p-2 outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="handle"
                className="text-sm sm:text-lg sm:mb-2 font-bold"
              >
                profile views
              </label>

              <input
                id="tiktokViews"
                name="tiktokViews"
                type="number"
                onChange={formik.handleChange}
                onKeyPress={validateKeyPressed}
                value={formik.values.tiktokViews}
                disabled={!formik.values.tiktokHandle}
                className="w-[150px] sm:w-[205px] h-12 bg-gray7 border border-gray10 mb-5 p-2 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col">
              <label
                htmlFor="handle"
                className="text-sm sm:text-lg sm:mb-2 font-bold"
              >
                likes
              </label>

              <input
                id="tiktokLikes"
                name="tiktokLikes"
                type="number"
                onChange={formik.handleChange}
                onKeyPress={validateKeyPressed}
                value={formik.values.tiktokLikes}
                disabled={!formik.values.tiktokHandle}
                className="w-[150px] sm:w-[205px] h-12 bg-gray7 border border-gray10 mb-5 p-2 outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="handle"
                className="text-sm sm:text-lg sm:mb-2 font-bold"
              >
                comments
              </label>

              <input
                id="tiktokComments"
                name="tiktokComments"
                type="number"
                onChange={formik.handleChange}
                onKeyPress={validateKeyPressed}
                value={formik.values.tiktokComments}
                disabled={!formik.values.tiktokHandle}
                className="w-[150px] sm:w-[205px] h-12 bg-gray7 border border-gray10 mb-5 p-2 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col">
              <label
                htmlFor="handle"
                className="text-sm sm:text-lg sm:mb-2 font-bold"
              >
                shares
              </label>

              <input
                id="tiktokShares"
                name="tiktokShares"
                type="number"
                onChange={formik.handleChange}
                onKeyPress={validateKeyPressed}
                value={formik.values.tiktokShares}
                disabled={!formik.values.tiktokHandle}
                className="w-[150px] sm:w-[205px] h-12 bg-gray7 border border-gray10 mb-10 p-2 outline-none"
              />
            </div>
          </div>
        </div>
      )}

      <div
        onClick={() => openSection('discord')}
        className="flex items-center mb-5 hover:cursor-pointer"
      >
        <div className="flex mr-[10px]">
          <Image
            src="/images/discord-icon.svg"
            width={30}
            height={29}
            alt="discord icon"
          />
        </div>

        <p className="text-white text-[22px] mr-[10px]">Discord</p>

        <div className="w-full border border-gray10 mr-[10px]" />

        <div className="flex">
          <Image
            src="/images/open-icon.svg"
            width={12}
            height={7}
            alt="open icon"
          />
        </div>
      </div>

      {sectionIsOpen === 'discord' && (
        <div className="flex flex-col">
          <label
            htmlFor="handle"
            className="text-sm sm:text-lg sm:mb-2 font-bold"
          >
            handle
          </label>

          <div className="flex mb-5">
            <div className="px-4 h-12 bg-secondary hidden sm:flex justify-center items-center border border-r-0 border-gray10">
              <p className="font-bold">discord.gg/</p>
            </div>

            <div className="relative w-full">
              <input
                id="discordHandle"
                name="discordHandle"
                type="text"
                onChange={formik.handleChange}
                onKeyPress={validateKeyPressed}
                value={formik.values.discordHandle}
                className="w-full h-12 bg-gray7 border sm:border-l-0 border-gray10 p-2 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col">
              <label
                htmlFor="handle"
                className="text-sm sm:text-lg sm:mb-2 font-bold"
              >
                members
              </label>

              <input
                id="discordMembers"
                name="discordMembers"
                type="number"
                onChange={formik.handleChange}
                onKeyPress={validateKeyPressed}
                value={formik.values.discordMembers}
                disabled={!formik.values.discordHandle}
                className="w-[150px] sm:w-[205px] h-12 bg-gray7 border border-gray10 mb-10 p-2 outline-none"
              />
            </div>
          </div>
        </div>
      )}

      <div
        onClick={() => openSection('telegram')}
        className="flex items-center mb-5 hover:cursor-pointer"
      >
        <div className="flex mr-[10px]">
          <Image
            src="/images/telegram-icon.svg"
            width={30}
            height={21}
            alt="telegram icon"
          />
        </div>

        <p className="text-white text-[22px] mr-[10px]">Telegram</p>

        <div className="w-full border border-gray10 mr-[10px]" />

        <div className="flex">
          <Image
            src="/images/open-icon.svg"
            width={12}
            height={7}
            alt="open icon"
          />
        </div>
      </div>

      {sectionIsOpen === 'telegram' && (
        <div className="flex flex-col">
          <label
            htmlFor="handle"
            className="text-sm sm:text-lg sm:mb-2 font-bold"
          >
            handle
          </label>

          <div className="flex mb-5">
            <div className="px-4 h-12 bg-secondary hidden sm:flex justify-center items-center border border-r-0 border-gray10">
              <p className="font-bold">t.me/</p>
            </div>

            <div className="relative w-full">
              <input
                id="telegramHandle"
                name="telegramHandle"
                type="text"
                onChange={formik.handleChange}
                onKeyPress={validateKeyPressed}
                value={formik.values.telegramHandle}
                className="w-full h-12 bg-gray7 border sm:border-l-0 border-gray10 p-2 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col">
              <label
                htmlFor="handle"
                className="text-sm sm:text-lg sm:mb-2 font-bold"
              >
                members
              </label>

              <input
                id="telegramMembers"
                name="telegramMembers"
                type="number"
                onChange={formik.handleChange}
                onKeyPress={validateKeyPressed}
                value={formik.values.telegramMembers}
                disabled={!formik.values.telegramHandle}
                className="w-[150px] sm:w-[205px] h-12 bg-gray7 border border-gray10 mb-10 p-2 outline-none"
              />
            </div>
          </div>
        </div>
      )}

      <div
        onClick={() => openSection('twitter')}
        className="flex items-center mb-5 hover:cursor-pointer"
      >
        <div className="flex mr-[10px]">
          <Image
            src="/images/twitter-icon.svg"
            width={30}
            height={30}
            alt="twitter icon"
          />
        </div>

        <p className="text-white text-[22px] mr-[10px]">Twitter</p>

        <div className="w-full border border-gray10 mr-[10px]" />

        <div className="flex">
          <Image
            src="/images/open-icon.svg"
            width={12}
            height={7}
            alt="open icon"
          />
        </div>
      </div>

      {sectionIsOpen === 'twitter' && (
        <div className="mb-8 flex flex-col">
          <label
            htmlFor="handle"
            className="text-sm sm:text-lg sm:mb-2 font-bold"
          >
            handle
          </label>

          <div className="flex mb-5">
            <div className="px-4 h-12 bg-secondary hidden sm:flex justify-center items-center border border-r-0 border-gray10">
              <p className="font-bold">twitter.com/</p>
            </div>

            <div className="relative w-full">
              <input
                id="twitterHandle"
                name="twitterHandle"
                type="text"
                onChange={formik.handleChange}
                onKeyPress={validateKeyPressed}
                value={formik.values.twitterHandle}
                className="w-full h-12 bg-gray7 border sm:border-l-0 border-gray10 p-2 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col">
              <label
                htmlFor="handle"
                className="text-sm sm:text-lg sm:mb-2 font-bold"
              >
                followers
              </label>

              <input
                id="twitterFollowers"
                name="twitterFollowers"
                type="number"
                onChange={formik.handleChange}
                onKeyPress={validateKeyPressed}
                value={formik.values.twitterFollowers}
                disabled={!formik.values.twitterHandle}
                className="w-[150px] sm:w-[205px] h-12 bg-gray7 border border-gray10 p-2 outline-none"
              />
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 right-0 w-screen sm:w-[600px] h-16 bg-gradient-to-t from-black to-black[0] z-30 px-5 sm:px-[70px] py-10 flex items-end">
        <Button
          text={props.buttonText}
          color="bg-blue"
          onClick={request}
          onKeyDown={request}
        />
      </div>
    </form>
  );
}
