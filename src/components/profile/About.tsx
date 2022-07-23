import CopyToClipboard from '@components/CopyToClipboard';
import EditToPublishAlert from '@components/EditToPublishAlert';
import AddIcon from '@components/icons/AddIcon';
import CheckmarkIcon from '@components/icons/CheckmarkIcon';
import EditIcon from '@components/icons/EditIcon';
import PublishProfileSidebar from '@components/sidebars/PublishProfileSidebar';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import Button from '../Button';
import EditAboutSidebar from '../sidebars/EditAboutSidebar';
import ProfileImage from './ProfileImage';

const PresentationVideo = dynamic(
  () => import('@components/profile/PresentationVideo'),
  {
    ssr: false,
  },
);

interface AboutProps {
  sidebarOpened: boolean;
  setSidebarOpened: (value: boolean) => void;
  baseImageUrl: string;
  bannerImage: string;
  profileImage: string;
  title: string;
  handle: string;
  description: string;
  tags: string[];
  isOwner: boolean;
  categories: unknown[];
  categoryName: string;
  website: string;
  categoryId: number;
  presentationVideo: string;
  languages: string[];
  languageName: string;
  languageId: number;
  status: string;
  services: unknown[];
  instagramHandle: string;
  twitchHandle: string;
  tiktokHandle: string;
  discordHandle: string;
  telegramHandle: string;
  twitterHandle: string;
}

export default function About(props: AboutProps) {
  const [editAboutSidebarIsOpen, setEditAboutSidebarIsOpen] = useState(false);
  const [publishProfileModalIsOpen, setPublishProfileModalIsOpen] =
    useState(false);

  const [editingPresentationVideo, setEditingPresentationVideo] =
    useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const [editingTags, setEditingTags] = useState(false);

  function closeEditAboutSidebar() {
    props.setSidebarOpened(false);
    setEditAboutSidebarIsOpen(false);
  }

  function openPublishProfileModal() {
    setPublishProfileModalIsOpen(true);
  }

  function openEditAboutSidebar(
    editPresentationVideo?: boolean,
    editDescription?: boolean,
    editTags?: boolean,
  ) {
    props.setSidebarOpened(true);
    setEditAboutSidebarIsOpen(true);

    if (editPresentationVideo) {
      setEditingPresentationVideo(true);
    }

    if (editDescription) {
      setEditingDescription(true);
    }

    if (editTags) {
      setEditingTags(true);
    }
  }

  useEffect(() => {
    if (editingPresentationVideo) {
      setTimeout(() => {
        setEditingPresentationVideo(false);
      }, 1000 * 2);
    }
  }, [editingPresentationVideo]);

  useEffect(() => {
    if (editingDescription) {
      setTimeout(() => {
        setEditingDescription(false);
      }, 1000 * 2);
    }
  }, [editingDescription]);

  useEffect(() => {
    if (editingTags) {
      setTimeout(() => {
        setEditingTags(false);
      }, 1000 * 2);
    }
  }, [editingTags]);

  return (
    <>
      <PublishProfileSidebar
        open={publishProfileModalIsOpen}
        setOpen={setPublishProfileModalIsOpen}
        description={props.description}
        tags={props.tags}
        services={props.services}
        tiktokHandle={props.tiktokHandle}
        instagramHandle={props.instagramHandle}
        twitterHandle={props.twitterHandle}
        twitchHandle={props.twitchHandle}
        discordHandle={props.discordHandle}
        telegramHandle={props.telegramHandle}
        handle={props.handle}
        openEditAboutSidebar={openEditAboutSidebar}
      />

      <EditAboutSidebar
        description={props.description}
        categories={props.categories}
        opened={editAboutSidebarIsOpen}
        close={closeEditAboutSidebar}
        handle={props.handle}
        tags={props.tags}
        categoryName={props.categoryName}
        categoryId={props.categoryId}
        website={props.website}
        presentationVideo={props.presentationVideo}
        languages={props.languages}
        languageName={props.languageName}
        languageId={props.languageId}
        profileImage={props.profileImage}
        bannerImage={props.bannerImage}
        baseImageUrl={props.baseImageUrl}
        editingPresentationVideo={editingPresentationVideo}
        editingDescription={editingDescription}
        editingTags={editingTags}
      />

      <section className="shadow-[0_0px_4px_4px_rgba(0,0,0,0.25)] flex flex-col bg-black">
        <div className="w-full h-36 sm:h-[308px] bg-gradient-to-t from-blue to-blue/[0.0] relative">
          {props.status === 'draft' && props.isOwner && (
            <div className="hidden sm:flex">
              <EditToPublishAlert
                openPublishProfileModal={openPublishProfileModal}
              />
            </div>
          )}

          {props.bannerImage && (
            <Image
              src={props.bannerImage}
              objectFit="cover"
              layout="fill"
              alt="banner image"
            />
          )}
        </div>

        <div className="pb-10 sm:pb-[70px]">
          <div className="flex w-full px-5 sm:px-[150px] py-10 sm:py-[70px] relative justify-center items-end">
            {props.isOwner && (
              <div
                onClick={() => openEditAboutSidebar(null)}
                className="hidden sm:flex hover:cursor-pointer absolute top-[30px] left-[30px]"
              >
                <EditIcon size={30} />
              </div>
            )}

            {props.isOwner && (
              <div
                onClick={() => openEditAboutSidebar(null)}
                className="flex sm:hidden hover:cursor-pointer absolute top-[15px] left-[15px]"
              >
                <EditIcon size={20} />
              </div>
            )}

            <div className="flex flex-col sm:flex-row max-w-[1010px] w-full justify-between items-center sm:items-end">
              <div className="flex flex-col sm:flex-row justify-center items-center absolute top-[-30px] gap-3 sm:gap-8">
                <ProfileImage src={props.profileImage} />

                <div className="flex flex-col items-center">
                  <p className="text-2xl sm:text-[34px] flex items-center gap-[10px] sm:mt-10 leading-none">
                    {props.title}{' '}
                    {props.status === 'verified' && <CheckmarkIcon size={22} />}
                  </p>

                  <strong className="sm:text-[20px] text-gray6 gap-[10px] flex items-center">
                    @{props.handle}{' '}
                    <CopyToClipboard
                      size={18}
                      textToCopy={`https://app.cobogo.social/${props.handle}`}
                    />
                  </strong>
                </div>
              </div>

              <div className="h-64 flex flex-col justify-between mt-28 sm:mt-0 w-full sm:w-auto">
                <div className="flex flex-col">
                  <p className="max-w-[327px] sm:max-w-[464px] break-words">
                    {props.description?.length > 300 ? (
                      <>{props.description.slice(0, 300)} (...)</>
                    ) : (
                      props.description
                    )}
                  </p>
                </div>

                {props.website && (
                  <a
                    target="_blank"
                    href={props.website}
                    className="flex mt-8 mb-8 sm:mb-0"
                    rel="noreferrer"
                  >
                    <Button
                      text="website"
                      borderColor="border-gray4"
                      borderSize="border"
                      textColor="text-blue"
                      width="w-full sm:w-auto"
                      icon="/images/link-icon.svg"
                    />
                  </a>
                )}
              </div>

              <div className="hidden sm:flex flex-col gap-10">
                {props.presentationVideo && !props.sidebarOpened ? (
                  <PresentationVideo
                    videoId={props.presentationVideo?.split('=')[1]}
                  />
                ) : (
                  <div className="relative">
                    {!props.presentationVideo && props.isOwner && (
                      <button
                        onClick={() => openEditAboutSidebar(true)}
                        className="z-20 absolute flex gap-2 bottom-10 left-10 items-center text-blue text-xl"
                      >
                        {!props.sidebarOpened && (
                          <>
                            <AddIcon size={18} />{' '}
                            <strong>showcase your best work</strong>
                          </>
                        )}
                      </button>
                    )}

                    {!props.sidebarOpened && (
                      <div className="bg-gradient-to-t from-black to-black/[0] z-10 w-full h-full absolute" />
                    )}

                    <Image
                      src="/images/presentation-video.png"
                      width={481}
                      height={268}
                      alt="presentation video"
                    />
                  </div>
                )}

                <div className="flex justify-around items-center">
                  {props.tags?.map((tag, index) => {
                    if (index % 2 === 0) {
                      return (
                        <p key={tag} className="font-bold text-pink">
                          {tag}
                        </p>
                      );
                    }

                    return (
                      <p key={tag} className="font-bold text-violet">
                        {tag}
                      </p>
                    );
                  })}
                </div>
              </div>

              {props.status === 'draft' && props.isOwner && (
                <div className="flex sm:hidden">
                  <EditToPublishAlert
                    openPublishProfileModal={openPublishProfileModal}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex sm:hidden flex-col gap-10">
            {props.presentationVideo && !props.sidebarOpened ? (
              <PresentationVideo
                videoId={props.presentationVideo?.split('=')[1]}
              />
            ) : (
              <div className="relative">
                {!props.presentationVideo && props.isOwner && (
                  <button
                    onClick={() => openEditAboutSidebar(true)}
                    className="z-20 absolute flex gap-2 bottom-10 left-10 items-center text-blue text-xl"
                  >
                    {!props.sidebarOpened && (
                      <>
                        <AddIcon size={18} />{' '}
                        <strong>showcase your best work</strong>
                      </>
                    )}
                  </button>
                )}

                {!props.sidebarOpened && (
                  <div className="bg-gradient-to-t from-black to-black/[0] z-10 w-full h-full absolute" />
                )}

                <Image
                  src="/images/presentation-video.png"
                  width={481}
                  height={268}
                  alt="presentation video"
                />
              </div>
            )}

            <div className="flex justify-around items-center">
              {props.tags?.map((tag, index) => {
                if (index % 2 === 0) {
                  return (
                    <p key={tag} className="font-bold text-pink">
                      {tag}
                    </p>
                  );
                }

                return (
                  <p key={tag} className="font-bold text-violet">
                    {tag}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
