import Image from 'next/image';
import { useEffect, useState } from 'react';

import Button from './Button';

interface EditMediaKitSocialModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function EditMediaKitSocialModal({
  isOpen,
  setIsOpen,
}: EditMediaKitSocialModalProps) {
  const [sectionIsOpen, setSectionIsOpen] = useState('');

  function closeModal() {
    setIsOpen(false);
  }

  function request(event: { key: string }) {
    if (event.key === 'Enter') {
      return;
    }
  }

  function openSection(sectionName: string) {
    if (sectionIsOpen === sectionName) {
      setSectionIsOpen('');
    } else {
      setSectionIsOpen(sectionName);
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('active-modal');
    } else {
      document.body.classList.remove('active-modal');
    }
  }, [isOpen]);

  return isOpen ? (
    <div className="w-screen h-screen fixed top-0 right-0 z-10 flex justify-center items-center bg-black/[0.5]">
      <div className="relative bg-primary w-full sm:w-[598px] h-full sm:h-auto flex flex-col border-[1px] border-gray10 p-[40px] sm:p-[70px] shadow-[0_0px_0px_10px_rgba(0,0,0,0.4)]">
        <div className="flex flex-col items-start justify-center">
          <div
            onClick={closeModal}
            className="absolute top-10 sm:top-0 right-0 mt-[20px] mr-[20px] hover:cursor-pointer"
          >
            <Image
              src="/images/x2-icon.svg"
              width={13}
              height={13}
              alt="x2 icon"
            />
          </div>

          <p className="text-white text-[40px] mb-4">media kit - social</p>

          <form className="flex flex-col w-full">
            <div
              onClick={() => openSection('youtube')}
              className="flex items-center mb-4 hover:cursor-pointer"
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

              <div className="w-full border-[1px] border-gray10 mr-[10px]" />

              <div className="flex">
                <Image
                  src="/images/open2-icon.svg"
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
                      className="text-lg sm:mb-2 font-bold"
                    >
                      subscribers
                    </label>

                    <input
                      id="handle"
                      name="handle"
                      type="text"
                      className="w-[205px] h-12 bg-gray7 border-[1px] border-gray10 mb-4 p-2 outline-none"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="handle"
                      className="text-lg sm:mb-2 font-bold"
                    >
                      videos
                    </label>

                    <input
                      id="handle"
                      name="handle"
                      type="text"
                      className="w-[205px] h-12 bg-gray7 border-[1px] border-gray10 mb-4 p-2 outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <label
                      htmlFor="handle"
                      className="text-lg sm:mb-2 font-bold"
                    >
                      views
                    </label>

                    <input
                      id="handle"
                      name="handle"
                      type="text"
                      className="w-[205px] h-12 bg-gray7 border-[1px] border-gray10 mb-4 p-2 outline-none"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="handle"
                      className="text-lg sm:mb-2 font-bold"
                    >
                      unique viewers
                    </label>

                    <input
                      id="handle"
                      name="handle"
                      type="text"
                      className="w-[205px] h-12 bg-gray7 border-[1px] border-gray10 mb-4 p-2 outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <label
                      htmlFor="handle"
                      className="text-lg sm:mb-2 font-bold"
                    >
                      views
                    </label>

                    <input
                      id="handle"
                      name="handle"
                      type="text"
                      className="w-[205px] h-12 bg-gray7 border-[1px] border-gray10 mb-4 p-2 outline-none"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="handle"
                      className="text-lg sm:mb-2 font-bold"
                    >
                      unique viewers
                    </label>

                    <input
                      id="handle"
                      name="handle"
                      type="text"
                      className="w-[205px] h-12 bg-gray7 border-[1px] border-gray10 mb-4 p-2 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            <div
              onClick={() => openSection('instagram')}
              className="flex items-center mb-4 hover:cursor-pointer"
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

              <div className="w-full border-[1px] border-gray10 mr-[10px]" />

              <div className="flex">
                <Image
                  src="/images/open2-icon.svg"
                  width={12}
                  height={7}
                  alt="open icon"
                />
              </div>
            </div>

            {sectionIsOpen === 'instagram' && (
              <div className="flex flex-col">
                <label htmlFor="handle" className="text-lg sm:mb-2 font-bold">
                  handle
                </label>

                <div className="flex mb-4">
                  <div className="px-4 h-12 bg-secondary hidden sm:flex justify-center items-center border-[1px] border-r-0 border-gray10">
                    <p className="font-bold">instagram.com/</p>
                  </div>

                  <div className="relative w-full">
                    <input
                      id="handle"
                      name="handle"
                      type="text"
                      className="w-full h-12 bg-gray7 border-[1px] sm:border-l-0 border-gray10 p-2 outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <label
                      htmlFor="handle"
                      className="text-lg sm:mb-2 font-bold"
                    >
                      followers
                    </label>

                    <input
                      id="handle"
                      name="handle"
                      type="text"
                      className="w-[205px] h-12 bg-gray7 border-[1px] border-gray10 mb-4 p-2 outline-none"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="handle"
                      className="text-lg sm:mb-2 font-bold"
                    >
                      impressions
                    </label>

                    <input
                      id="handle"
                      name="handle"
                      type="text"
                      className="w-[205px] h-12 bg-gray7 border-[1px] border-gray10 mb-4 p-2 outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <label
                      htmlFor="handle"
                      className="text-lg sm:mb-2 font-bold"
                    >
                      stories average views
                    </label>

                    <input
                      id="handle"
                      name="handle"
                      type="text"
                      className="w-[205px] h-12 bg-gray7 border-[1px] border-gray10 mb-4 p-2 outline-none"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="handle"
                      className="text-lg sm:mb-2 font-bold"
                    >
                      posts average likes
                    </label>

                    <input
                      id="handle"
                      name="handle"
                      type="text"
                      className="w-[205px] h-12 bg-gray7 border-[1px] border-gray10 mb-4 p-2 outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <label
                      htmlFor="handle"
                      className="text-lg sm:mb-2 font-bold"
                    >
                      reels average views
                    </label>

                    <input
                      id="handle"
                      name="handle"
                      type="text"
                      className="w-[205px] h-12 bg-gray7 border-[1px] border-gray10 mb-4 p-2 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            <div
              onClick={() => openSection('twitch')}
              className="flex items-center mb-4 hover:cursor-pointer"
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

              <div className="w-full border-[1px] border-gray10 mr-[10px]" />

              <div className="flex">
                <Image
                  src="/images/open2-icon.svg"
                  width={12}
                  height={7}
                  alt="open icon"
                />
              </div>
            </div>

            {sectionIsOpen === 'twitch' && (
              <div className="flex flex-col">
                <label htmlFor="handle" className="text-lg sm:mb-2 font-bold">
                  handle
                </label>

                <div className="flex mb-4">
                  <div className="px-4 h-12 bg-secondary hidden sm:flex justify-center items-center border-[1px] border-r-0 border-gray10">
                    <p className="font-bold">twitch.tv/</p>
                  </div>

                  <div className="relative w-full">
                    <input
                      id="handle"
                      name="handle"
                      type="text"
                      className="w-full h-12 bg-gray7 border-[1px] sm:border-l-0 border-gray10 p-2 outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <label
                      htmlFor="handle"
                      className="text-lg sm:mb-2 font-bold"
                    >
                      subscribers
                    </label>

                    <input
                      id="handle"
                      name="handle"
                      type="text"
                      className="w-[205px] h-12 bg-gray7 border-[1px] border-gray10 mb-4 p-2 outline-none"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="handle"
                      className="text-lg sm:mb-2 font-bold"
                    >
                      videos
                    </label>

                    <input
                      id="handle"
                      name="handle"
                      type="text"
                      className="w-[205px] h-12 bg-gray7 border-[1px] border-gray10 mb-4 p-2 outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <label
                      htmlFor="handle"
                      className="text-lg sm:mb-2 font-bold"
                    >
                      average viewers
                    </label>

                    <input
                      id="handle"
                      name="handle"
                      type="text"
                      className="w-[205px] h-12 bg-gray7 border-[1px] border-gray10 mb-4 p-2 outline-none"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="handle"
                      className="text-lg sm:mb-2 font-bold"
                    >
                      peak viewers
                    </label>

                    <input
                      id="handle"
                      name="handle"
                      type="text"
                      className="w-[205px] h-12 bg-gray7 border-[1px] border-gray10 mb-4 p-2 outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <label
                      htmlFor="handle"
                      className="text-lg sm:mb-2 font-bold"
                    >
                      watch time hours
                    </label>

                    <input
                      id="handle"
                      name="handle"
                      type="text"
                      className="w-[205px] h-12 bg-gray7 border-[1px] border-gray10 mb-4 p-2 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            <div
              onClick={() => openSection('tiktok')}
              className="flex items-center mb-4 hover:cursor-pointer"
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

              <div className="w-full border-[1px] border-gray10 mr-[10px]" />

              <div className="flex">
                <Image
                  src="/images/open2-icon.svg"
                  width={12}
                  height={7}
                  alt="open icon"
                />
              </div>
            </div>

            {sectionIsOpen === 'tiktok' && (
              <div className="flex flex-col">
                <label htmlFor="handle" className="text-lg sm:mb-2 font-bold">
                  handle
                </label>

                <div className="flex mb-4">
                  <div className="px-4 h-12 bg-secondary hidden sm:flex justify-center items-center border-[1px] border-r-0 border-gray10">
                    <p className="font-bold">tiktok.com/</p>
                  </div>

                  <div className="relative w-full">
                    <input
                      id="handle"
                      name="handle"
                      type="text"
                      className="w-full h-12 bg-gray7 border-[1px] sm:border-l-0 border-gray10 p-2 outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <label
                      htmlFor="handle"
                      className="text-lg sm:mb-2 font-bold"
                    >
                      followers
                    </label>

                    <input
                      id="handle"
                      name="handle"
                      type="text"
                      className="w-[205px] h-12 bg-gray7 border-[1px] border-gray10 mb-4 p-2 outline-none"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="handle"
                      className="text-lg sm:mb-2 font-bold"
                    >
                      profile views
                    </label>

                    <input
                      id="handle"
                      name="handle"
                      type="text"
                      className="w-[205px] h-12 bg-gray7 border-[1px] border-gray10 mb-4 p-2 outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <label
                      htmlFor="handle"
                      className="text-lg sm:mb-2 font-bold"
                    >
                      likes
                    </label>

                    <input
                      id="handle"
                      name="handle"
                      type="text"
                      className="w-[205px] h-12 bg-gray7 border-[1px] border-gray10 mb-4 p-2 outline-none"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="handle"
                      className="text-lg sm:mb-2 font-bold"
                    >
                      comments
                    </label>

                    <input
                      id="handle"
                      name="handle"
                      type="text"
                      className="w-[205px] h-12 bg-gray7 border-[1px] border-gray10 mb-4 p-2 outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <label
                      htmlFor="handle"
                      className="text-lg sm:mb-2 font-bold"
                    >
                      shares
                    </label>

                    <input
                      id="handle"
                      name="handle"
                      type="text"
                      className="w-[205px] h-12 bg-gray7 border-[1px] border-gray10 mb-4 p-2 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            <div
              onClick={() => openSection('discord')}
              className="flex items-center mb-4 hover:cursor-pointer"
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

              <div className="w-full border-[1px] border-gray10 mr-[10px]" />

              <div className="flex">
                <Image
                  src="/images/open2-icon.svg"
                  width={12}
                  height={7}
                  alt="open icon"
                />
              </div>
            </div>

            {sectionIsOpen === 'discord' && (
              <div className="flex flex-col">
                <label htmlFor="handle" className="text-lg sm:mb-2 font-bold">
                  handle
                </label>

                <div className="flex mb-4">
                  <div className="px-4 h-12 bg-secondary hidden sm:flex justify-center items-center border-[1px] border-r-0 border-gray10">
                    <p className="font-bold">discord.gg/</p>
                  </div>

                  <div className="relative w-full">
                    <input
                      id="handle"
                      name="handle"
                      type="text"
                      className="w-full h-12 bg-gray7 border-[1px] sm:border-l-0 border-gray10 p-2 outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <label
                      htmlFor="handle"
                      className="text-lg sm:mb-2 font-bold"
                    >
                      members
                    </label>

                    <input
                      id="handle"
                      name="handle"
                      type="text"
                      className="w-[205px] h-12 bg-gray7 border-[1px] border-gray10 mb-4 p-2 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            <div
              onClick={() => openSection('telegram')}
              className="flex items-center mb-4 hover:cursor-pointer"
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

              <div className="w-full border-[1px] border-gray10 mr-[10px]" />

              <div className="flex">
                <Image
                  src="/images/open2-icon.svg"
                  width={12}
                  height={7}
                  alt="open icon"
                />
              </div>
            </div>

            {sectionIsOpen === 'telegram' && (
              <div className="flex flex-col">
                <label htmlFor="handle" className="text-lg sm:mb-2 font-bold">
                  handle
                </label>

                <div className="flex mb-4">
                  <div className="px-4 h-12 bg-secondary hidden sm:flex justify-center items-center border-[1px] border-r-0 border-gray10">
                    <p className="font-bold">t.me/</p>
                  </div>

                  <div className="relative w-full">
                    <input
                      id="handle"
                      name="handle"
                      type="text"
                      className="w-full h-12 bg-gray7 border-[1px] sm:border-l-0 border-gray10 p-2 outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <label
                      htmlFor="handle"
                      className="text-lg sm:mb-2 font-bold"
                    >
                      members
                    </label>

                    <input
                      id="handle"
                      name="handle"
                      type="text"
                      className="w-[205px] h-12 bg-gray7 border-[1px] border-gray10 mb-4 p-2 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            <div
              onClick={() => openSection('twitter')}
              className={`flex items-center ${
                sectionIsOpen === 'twitter' ? 'mb-4' : 'mb-8'
              } hover:cursor-pointer`}
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

              <div className="w-full border-[1px] border-gray10 mr-[10px]" />

              <div className="flex">
                <Image
                  src="/images/open2-icon.svg"
                  width={12}
                  height={7}
                  alt="open icon"
                />
              </div>
            </div>

            {sectionIsOpen === 'twitter' && (
              <div className="mb-8 flex flex-col">
                <label htmlFor="handle" className="text-lg sm:mb-2 font-bold">
                  handle
                </label>

                <div className="flex mb-4">
                  <div className="px-4 h-12 bg-secondary hidden sm:flex justify-center items-center border-[1px] border-r-0 border-gray10">
                    <p className="font-bold">twitter.com/</p>
                  </div>

                  <div className="relative w-full">
                    <input
                      id="handle"
                      name="handle"
                      type="text"
                      className="w-full h-12 bg-gray7 border-[1px] sm:border-l-0 border-gray10 p-2 outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <label
                      htmlFor="handle"
                      className="text-lg sm:mb-2 font-bold"
                    >
                      followers
                    </label>

                    <input
                      id="handle"
                      name="handle"
                      type="text"
                      className="w-[205px] h-12 bg-gray7 border-[1px] border-gray10 mb-4 p-2 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            <Button
              text="save"
              color="bg-blue"
              width="w-[76px]"
              height="h-[38px]"
              onClick={request}
              onKeyDown={request}
            />
          </form>
        </div>
      </div>
    </div>
  ) : null;
}
