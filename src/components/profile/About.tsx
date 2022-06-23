import CopyIcon from '@components/icons/CopyIcon';
import EditIcon from '@components/icons/EditIcon';
import Image from 'next/image';
import { useState } from 'react';

import Button from '../Button';
import EditAboutModal from './EditAboutModal';
import ProfileImage from './ProfileImage';
import VideoImage from './VideoImage';

interface AboutProps {
  bannerImage: string;
  profileImage: string;
  title: string;
  handle: string;
  description: string;
  tags: string[];
  isOwner: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categories: any[];
  categoryName: string;
  website: string;
}

export default function About(props: AboutProps): JSX.Element {
  const [editAboutModalIsOpen, setEditAboutModalIsOpen] =
    useState<boolean>(false);

  function openEditAboutModal() {
    setEditAboutModalIsOpen(true);
  }

  return (
    <>
      <EditAboutModal
        open={editAboutModalIsOpen}
        setOpen={setEditAboutModalIsOpen}
        description={props.description}
        tags={props.tags}
        handle={props.handle}
        categories={props.categories}
        categoryName={props.categoryName}
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
              onClick={openEditAboutModal}
              className="flex hover:cursor-pointer absolute top-[30px] left-[30px]"
            >
              <EditIcon size={30} />
            </div>
          )}

          <div className="flex max-w-[1000px] w-full justify-between items-end">
            <div className="flex justify-center items-center absolute top-[-30px]">
              <ProfileImage src={props.profileImage} />

              <div className="flex flex-col">
                <p className="text-[34px] flex items-center gap-[10px]">
                  {props.title}
                  {/* <CheckmarkIcon size={22} /> */}
                </p>

                <p className="text-[20px] text-gray6 font-bold gap-[10px] flex items-center">
                  @{props.handle}{' '}
                  <CopyIcon
                    size={18}
                    textToCopy={`https://app.cobogo.social/${props.handle}`}
                  />
                </p>
              </div>
            </div>

            <div>
              <p className="text-[22px]">about</p>

              <p className="w-[464px]">{props.description}</p>

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
                    borderSize="border-[1px]"
                    textColor="text-blue"
                    icon="/images/link-icon.svg"
                  />
                </a>
              )}
            </div>

            <div>
              <VideoImage />

              <div className="flex justify-around items-center">
                {props.tags.map((tag, index) => {
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
