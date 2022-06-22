import Image from 'next/image';
import { useState } from 'react';

import Button from './Button';
import EditProfileModal from './profile/EditProfileModal';

interface ProfileAboutProps {
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
}

export default function ProfileAbout(props: ProfileAboutProps): JSX.Element {
  const [editProfileModalIsOpen, setEditProfileModalIsOpen] =
    useState<boolean>(false);

  function openEditProfileModal() {
    setEditProfileModalIsOpen(true);
  }

  return (
    <>
      <EditProfileModal
        open={editProfileModalIsOpen}
        setOpen={setEditProfileModalIsOpen}
        description={props.description}
        tags={props.tags}
        handle={props.handle}
        categories={props.categories}
        categoryName={props.categoryName}
      />

      <div className="shadow-[0_0px_4px_4px_rgba(0,0,0,0.25)]">
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
              onClick={openEditProfileModal}
              className="flex hover:cursor-pointer absolute top-[30px] left-[30px]"
            >
              <Image
                src="/images/edit-icon.svg"
                width={30}
                height={28}
                alt="edit icon"
              />
            </div>
          )}

          <div className="flex max-w-[1000px] w-full justify-between items-end">
            <div className="flex justify-center items-center absolute top-[-30px]">
              <div className="w-[140px] h-[140px] bg-blue mr-[30px] shadow-[0_0px_4px_4px_rgba(0,0,0,0.25)] relative">
                {props.profileImage && (
                  <Image
                    src={props.profileImage}
                    objectFit="cover"
                    layout="fill"
                    alt="profile image"
                  />
                )}
              </div>

              <div className="flex flex-col">
                <p className="text-[34px]">
                  {props.title}{' '}
                  <Image
                    src="/images/success-icon.svg"
                    width={22}
                    height={22}
                    alt="success icon"
                  />
                </p>

                <p className="text-[20px] text-gray6 font-bold">
                  @{props.handle}
                </p>
              </div>
            </div>

            <div>
              <p className="text-[22px]">about</p>

              <p className="w-[464px] mb-[30px]">{props.description}</p>

              <Button
                text="website"
                borderColor="border-gray4"
                borderSize="border-[1px]"
                textColor="text-blue"
                icon="/images/link-icon.svg"
              />
            </div>

            <div>
              <div className="mb-[45px] w-[480px] h-[268px] bg-blue" />

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
      </div>
    </>
  );
}
