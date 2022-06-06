import Image from 'next/image';

import Button from './Button';

interface MobileProfileAboutProps {
  isOwner: boolean;
  description: string;
  youtubeChannelId: string;
  openEditProfileModal: () => void;
}

export default function MobileProfileAbout({
  isOwner,
  description,
  youtubeChannelId,
  openEditProfileModal,
}: MobileProfileAboutProps) {
  return (
    <div className="flex sm:hidden flex-col items-start justify-between w-full bg-secondary px-[20px] py-[32px] mb-[40px]">
      <div className="w-[330px] flex flex-col">
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

        <p className="mb-[15px]">{description}</p>

        <div className="flex flex-col w-full">
          <a
            href={`https://www.youtube.com/channel/${youtubeChannelId}`}
            className="mb-[10px]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              text="visit channel"
              color="bg-secondary"
              width="w-full"
              borderColor="border-gray8"
              borderSize="border-[1px]"
              textColor="text-gray6"
              icon="/images/link-icon.svg"
            />
          </a>

          <Button
            text="Twitter"
            color="bg-secondary"
            width="w-full"
            borderColor="border-gray8"
            borderSize="border-[1px]"
            textColor="text-gray6"
            icon="/images/link-icon.svg"
          />
        </div>
      </div>
    </div>
  );
}
