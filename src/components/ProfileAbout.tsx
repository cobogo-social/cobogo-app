import Image from 'next/image';
import { useState } from 'react';

import Button from './Button';
import Categories from './Categories';
import EditProfileModal from './EditProfileModal';

export default function About() {
  const [editProfileModalIsOpen, setEditProfileModalIsOpen] = useState(false);

  function openEditProfileModal() {
    setEditProfileModalIsOpen(true);
  }

  return (
    <>
      <EditProfileModal
        isOpen={editProfileModalIsOpen}
        setIsOpen={setEditProfileModalIsOpen}
      />

      <div className="flex flex-col">
        <div className="flex mb-[10px]">
          <p className="mr-1 text-[22px]">about</p>

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
        </div>

        <p className="w-[486px] mb-[15px]">
          Follow the latest Rocket launch webcasts, Conferences & more
          space-related Livestream events. Channel Name provides a Platform for
          Aerospace companies, nonprofit organizations & scientists to
          communicate their work to the general public, decreasing the knowledge
          gap between academia and society.
        </p>

        <div className="flex mb-[30px]">
          <div className="mr-[20px]">
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

        <Categories categories={['category 1', 'category 2']} />
      </div>
    </>
  );
}
