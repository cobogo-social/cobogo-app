import Button from '@components/Button';
import Categories from '@components/Categories';
import EditProfileModal from '@components/EditProfileModal';
import Image from 'next/image';
import { useState } from 'react';

export default function Index() {
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
        <div className="h-[100px] w-full flex justify-between items-center px-[39px]">
          <Image src="/images/logo.svg" width={120} height={27} alt="logo" />

          <div className="flex items-center justify-center">
            <p className="font-bold mr-[40px] hover:cursor-pointer">
              back to home
            </p>

            <div className="mr-[40px]">
              <Button
                text="submit a channel"
                color="bg-purple"
                hoverColor="brightness-90"
                width="w-[174px]"
                height="h-[38px]"
              />
            </div>

            <div className="flex items-center justify-center hover:cursor-pointer">
              <div className="flex mr-[6px]">
                <Image
                  src="/images/metamask-small-icon.svg"
                  width={32}
                  height={32}
                  alt="metamask icon"
                />
              </div>

              <p className="font-bold mr-[10px]">wallet address</p>

              <div className="w-[9px] h-[9px] bg-green rounded-full" />
            </div>
          </div>
        </div>

        <div className="h-[299px] w-full">
          <div className="h-[207px] w-full bg-blue relative">
            <div className="w-full h-[92px] absolute bg-black opacity-50 bottom-0 flex justify-between items-center px-[145px]">
              <p className="text-[40px]">Channel Name</p>

              <div className="flex">
                <p className="mr-[40px]">
                  <span className="mr-1 font-bold">XXXX</span>
                  subscribers
                </p>

                <p>
                  <span className="mr-1 font-bold">XX</span>
                  stakers
                </p>
              </div>
            </div>
          </div>

          <div className="h-[92px] w-full bg-gray7 flex justify-between items-center px-[145px]">
            <div className="flex">
              <div className="flex flex-col mr-[30px]">
                <p className="font-bold">your stake</p>

                <p className="font-bold text-gray6">
                  <span className="text-blue">XXXX</span> CBG
                </p>
              </div>

              <div className="flex flex-col mr-[30px]">
                <p className="font-bold">your rewards</p>

                <p className="font-bold text-gray6">
                  <span className="text-blue">XX</span> CBG
                </p>
              </div>

              <div className="flex flex-col mr-[30px]">
                <p className="font-bold">total staked</p>

                <p className="font-bold text-gray6">
                  <span className="text-blue">XXXXX</span> CBG
                </p>
              </div>

              <div className="flex flex-col">
                <p className="font-bold">youtuber rewards</p>

                <p className="font-bold text-gray6">
                  <span className="text-blue">XXXX</span> CBG
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="mr-[25px]">
                <Button
                  text="withdraw"
                  color="bg-gray7"
                  hoverColor="brightness-90"
                  width="w-[114px]"
                  height="h-[38px]"
                  borderColor="border-purple"
                  borderSize="border-[1px]"
                />
              </div>

              <Button
                text="stake"
                color="bg-blue"
                hoverColor="brightness-90"
                width="w-[100px]"
                height="h-[38px]"
              />
            </div>
          </div>

          <div className="w-full pt-[62px] px-[147px] flex justify-between items-start">
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
                space-related Livestream events. Channel Name provides a
                Platform for Aerospace companies, nonprofit organizations &
                scientists to communicate their work to the general public,
                decreasing the knowledge gap between academia and society.
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

            <div>
              <p className="mb-[20px] text-[22px]">top stakers</p>

              <div className="w-[430px] h-[70px] bg-gray4 flex justify-between items-center px-[10px] mb-[20px]">
                <div className="flex items-center justify-center">
                  <div className="bg-blue w-[50px] h-[50px] mr-[20px]" />

                  <p className="font-bold">wallet address</p>
                </div>

                <p className="font-bold text-gray6">
                  <span className="text-green">XXXX</span> CBG
                </p>
              </div>

              <div className="w-[430px] h-[70px] bg-gray4 flex justify-between items-center px-[10px] mb-[20px]">
                <div className="flex items-center justify-center">
                  <div className="bg-blue w-[50px] h-[50px] mr-[20px]" />

                  <p className="font-bold">wallet address</p>
                </div>

                <p className="font-bold text-gray6">
                  <span className="text-green">XXXX</span> CBG
                </p>
              </div>

              <div className="w-[430px] h-[70px] bg-gray4 flex justify-between items-center px-[10px] mb-[20px]">
                <div className="flex items-center justify-center">
                  <div className="bg-blue w-[50px] h-[50px] mr-[20px]" />

                  <p className="font-bold">wallet address</p>
                </div>

                <p className="font-bold text-gray6">
                  <span className="text-green">XXXX</span> CBG
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full px-[147px] pb-[62px]">
            <p className="text-[22px] mb-[26px]">
              Channel Name's latest videos
            </p>

            <div className="flex">
              <div className="flex flex-col mr-[40px]">
                <div className="w-[220px] h-[123px] bg-blue mb-[15px]" />

                <p className="font-bold w-[218px] mb-[15px]">
                  WATCH LIVE: SpaceX First All-Civilian Crew Mission to Space!
                  #Inspiration4 #LIVE #SPACEX
                </p>

                <p className="font-bold text-blue hover:cursor-pointer">
                  watch on youtube
                </p>
              </div>

              <div className="flex flex-col mr-[40px]">
                <div className="w-[220px] h-[123px] bg-blue mb-[15px]" />

                <p className="font-bold w-[218px] mb-[15px]">
                  WATCH LIVE: SpaceX First All-Civilian Crew Mission to Space!
                  #Inspiration4 #LIVE #SPACEX
                </p>

                <p className="font-bold text-blue hover:cursor-pointer">
                  watch on youtube
                </p>
              </div>

              <div className="flex flex-col mr-[40px]">
                <div className="w-[220px] h-[123px] bg-blue mb-[15px]" />

                <p className="font-bold w-[218px] mb-[15px]">
                  WATCH LIVE: SpaceX First All-Civilian Crew Mission to Space!
                  #Inspiration4 #LIVE #SPACEX
                </p>

                <p className="font-bold text-blue hover:cursor-pointer">
                  watch on youtube
                </p>
              </div>

              <div className="flex flex-col mr-[40px]">
                <div className="w-[220px] h-[123px] bg-blue mb-[15px]" />

                <p className="font-bold w-[218px] mb-[15px]">
                  WATCH LIVE: SpaceX First All-Civilian Crew Mission to Space!
                  #Inspiration4 #LIVE #SPACEX
                </p>

                <p className="font-bold text-blue hover:cursor-pointer">
                  watch on youtube
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
