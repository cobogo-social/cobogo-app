import CopyToClipboard from '@components/CopyToClipboard';
import AddIcon from '@components/icons/AddIcon';
import CheckmarkIcon from '@components/icons/CheckmarkIcon';
import EditIcon from '@components/icons/EditIcon';
import VerifyProfileModal from '@components/modals/VerifyProfileModal';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useState } from 'react';

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
  const [verifyProfileModalIsOpen, setVerifyProfileModalIsOpen] =
    useState(false);

  function openEditAboutSidebar() {
    setEditAboutSidebarIsOpen(true);
  }

  function openVerifyProfileModal() {
    setVerifyProfileModalIsOpen(true);
  }

  return (
    <>
      <VerifyProfileModal
        open={verifyProfileModalIsOpen}
        setOpen={setVerifyProfileModalIsOpen}
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
      />

      <EditAboutSidebar
        description={props.description}
        categories={props.categories}
        open={editAboutSidebarIsOpen}
        setOpen={setEditAboutSidebarIsOpen}
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
      />

      <section className="shadow-[0_0px_4px_4px_rgba(0,0,0,0.25)]">
        <div className="w-full h-[308px] bg-gradient-to-t from-blue to-blue/[0.0] relative">
          {props.bannerImage && (
            <Image
              src={props.bannerImage}
              objectFit="cover"
              layout="fill"
              alt="banner image"
            />
          )}
        </div>

        <div className="flex w-full px-[150px] py-[70px] relative justify-center items-end bg-black">
          {props.isOwner && (
            <div
              onClick={openEditAboutSidebar}
              className="flex hover:cursor-pointer absolute top-[30px] left-[30px]"
            >
              <EditIcon size={30} />
            </div>
          )}

          <div className="flex max-w-[1010px] w-full justify-between items-end">
            <div className="flex justify-center items-center absolute top-[-30px]">
              <ProfileImage src={props.profileImage} />

              <div className="flex flex-col">
                <p className="text-[34px] flex items-center gap-[10px]">
                  {props.title}{' '}
                  {props.status === 'draft' && props.isOwner && (
                    <div
                      onClick={openVerifyProfileModal}
                      className="flex gap-1 items-center hover:cursor-pointer"
                    >
                      <button className="text-xs bg-white font-bold text-black px-2 py-1">
                        publish draft
                      </button>
                    </div>
                  )}
                  {props.status === 'verified' && <CheckmarkIcon size={22} />}
                </p>

                <p className="text-[20px] text-gray6 font-bold gap-[10px] flex items-center">
                  @{props.handle}{' '}
                  <CopyToClipboard
                    size={18}
                    textToCopy={`https://app.cobogo.social/${props.handle}`}
                  />
                </p>
              </div>
            </div>

            <div className="h-64 flex flex-col justify-between">
              <div className="flex flex-col">
                <p className="text-[22px]">about</p>

                <p className="w-[464px]">
                  {props.description.slice(0, 300)} (...)
                </p>
              </div>

              {props.website && (
                <a
                  target="_blank"
                  href={props.website}
                  className="flex mt-[30px]"
                  rel="noreferrer"
                >
                  <Button
                    text="website"
                    borderColor="border-gray4"
                    borderSize="border"
                    textColor="text-blue"
                    icon="/images/link-icon.svg"
                  />
                </a>
              )}
            </div>

            <div className="flex flex-col gap-10">
              {props.presentationVideo ? (
                <PresentationVideo
                  videoId={props.presentationVideo?.split('=')[1]}
                />
              ) : (
                <div className="relative">
                  {!props.presentationVideo && props.isOwner && (
                    <button
                      onClick={openEditAboutSidebar}
                      className="z-20 absolute flex gap-2 bottom-10 left-10 items-center text-blue text-xl"
                    >
                      <AddIcon size={18} />{' '}
                      <strong>show case your best work</strong>
                    </button>
                  )}

                  <div className="bg-gradient-to-t from-black to-black/[0] z-10 w-full h-full absolute" />

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
        </div>
      </section>
    </>
  );
}
