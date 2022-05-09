import Image from 'next/image';
import { useState } from 'react';

import Button from './Button';
import Categories from './Categories';
import EditProfileModal from './EditProfileModal';

interface ProfileAboutProps {
  description: string;
  categories: string[];
  youtubeChannelId: string;
  isOwner: boolean;
  handle: string;
  setIsLoading: (value: boolean) => void;
  setIsError: (value: boolean) => void;
}

export default function ProfileAbout({
  description,
  categories,
  youtubeChannelId,
  isOwner,
  handle,
  setIsLoading,
  setIsError,
}: ProfileAboutProps) {
  const [editProfileModalIsOpen, setEditProfileModalIsOpen] = useState(false);

  function openEditProfileModal() {
    setEditProfileModalIsOpen(true);
  }

  return (
    <>
      <EditProfileModal
        isOpen={editProfileModalIsOpen}
        setIsOpen={setEditProfileModalIsOpen}
        description={description}
        categories={categories}
        handle={handle}
        setIsLoading={setIsLoading}
        setIsError={setIsError}
      />

      <div className="flex flex-col">
        <div className="flex mb-[10px]">
          <p className="mr-1 text-[22px]">about</p>

          {isOwner && (
            <div
              onClick={openEditProfileModal}
              className="flex hover:cursor-pointer"
            >
              <Image
                src="/images/edit-icon.svg"
                width={21}
                height={19}
                alt="edit icon"
              />
            </div>
          )}
        </div>

        <p className="w-[486px] mb-[15px]">{description}</p>

        <div className="flex mb-[30px]">
          <div className="mr-[20px]">
            <a
              href={`https://www.youtube.com/channel/${youtubeChannelId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                text="visit channel"
                color="bg-primary"
                hoverColor="brightness-90"
                width="w-[159px]"
                height="h-[38px]"
                borderColor="border-gray4"
                borderSize="border-[1px]"
                textColor="text-gray6"
                icon="/images/link-icon.svg"
              />
            </a>
          </div>

          <Button
            text="Twitter"
            color="bg-primary"
            hoverColor="brightness-90"
            width="w-[115px]"
            height="h-[38px]"
            borderColor="border-gray4"
            borderSize="border-[1px]"
            textColor="text-gray6"
            icon="/images/link-icon.svg"
          />
        </div>

        <Categories categories={categories} />
      </div>
    </>
  );
}
