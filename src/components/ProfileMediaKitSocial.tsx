import Image from 'next/image';
import { useState } from 'react';

export default function ProfileMediaKitSocial(): JSX.Element {
  const [singleOpen, setSingleOpen] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

  function openStep(stepNumber: number) {
    setSingleOpen(true);
    setStep(stepNumber);
  }

  function closeStep() {
    setSingleOpen(false);
  }

  function skipStep() {
    if (step < 6) {
      setStep((c) => c + 1);
    }
  }

  function backStep() {
    if (step > 1) {
      setStep((c) => c - 1);
    }
  }

  return singleOpen ? (
    <div className="flex w-full px-[150px] py-[70px] relative justify-center items-center">
      <div className="flex absolute top-[74px] right-[152px]">
        <div onClick={backStep} className="flex">
          <Image
            src="/images/back2-icon.svg"
            width={16}
            height={10}
            alt="back icon"
          />
        </div>

        <div onClick={skipStep} className="flex ml-[40px]">
          <Image
            src="/images/skip-icon.svg"
            width={16}
            height={10}
            alt="skip icon"
          />
        </div>

        <div onClick={closeStep} className="flex ml-[65px]">
          <Image
            src="/images/x2-icon.svg"
            width={16}
            height={15}
            alt="x icon"
          />
        </div>
      </div>

      <div className="flex max-w-[1300px] w-full justify-between items-center">
        <div className="flex flex-col w-full">
          <div className="flex w-full">
            <div className="mr-[20px] flex">
              <Image
                src="/images/ytb-icon.svg"
                width={60}
                height={42}
                alt="youtube icon"
              />
            </div>

            <div className="flex flex-col">
              <p className="font-bold text-[22px]">YouTube</p>

              <p className="font-bold text-blue">visit channel</p>
            </div>
          </div>

          <div className="flex justify-around items-center w-full">
            <div className="flex flex-col justify-center items-center">
              <p className="text-[60px] font-bold">3.87M</p>

              <p className="text-[18px] font-bold text-gray6">subscribers</p>

              <p className="text-[60px] font-bold">3.87M</p>

              <p className="text-[18px] font-bold text-gray6">subscribers</p>
            </div>

            <div className="flex flex-col justify-center items-center">
              <p className="text-[60px] font-bold">3.87M</p>

              <p className="text-[18px] font-bold text-gray6">subscribers</p>

              <p className="text-[60px] font-bold">3.87M</p>

              <p className="text-[18px] font-bold text-gray6">subscribers</p>
            </div>

            <div className="flex flex-col justify-center items-center">
              <p className="text-[60px] font-bold">3.87M</p>

              <p className="text-[18px] font-bold text-gray6">subscribers</p>

              <p className="text-[60px] font-bold">3.87M</p>

              <p className="text-[18px] font-bold text-gray6">subscribers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex w-full px-[150px] py-[70px] relative justify-center items-center">
      <div className="flex hover:cursor-pointer absolute top-[30px] left-[30px]">
        <Image
          src="/images/edit-icon.svg"
          width={30}
          height={28}
          alt="edit icon"
        />
      </div>

      <div className="flex max-w-[1300px] w-full justify-between items-center">
        <div className="flex flex-col">
          <div className="flex mb-[90px]">
            <div onClick={() => openStep(1)} className="mr-[27px] flex">
              <Image
                src="/images/ytb-icon.svg"
                width={74}
                height={42}
                alt="youtube icon"
              />
            </div>

            <div className="flex flex-col">
              <p className="font-bold text-[45px]">3.87M</p>
              <p className="font-bold text-gray6">subscribers</p>
              <p className="font-bold text-blue">visit channel</p>
            </div>
          </div>

          <div className="flex">
            <div onClick={() => openStep(2)} className="mr-[27px] flex">
              <Image
                src="/images/tiktok-icon.svg"
                width={74}
                height={56}
                alt="tiktok icon"
              />
            </div>

            <div className="flex flex-col">
              <p className="font-bold text-[45px]">3.87M</p>
              <p className="font-bold text-gray6">subscribers</p>
              <p className="font-bold text-blue">visit channel</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex mb-[90px]">
            <div onClick={() => openStep(3)} className="mr-[27px] flex">
              <Image
                src="/images/instagram-icon.svg"
                width={74}
                height={56}
                alt="instagram icon"
              />
            </div>

            <div className="flex flex-col">
              <p className="font-bold text-[45px]">3.87M</p>
              <p className="font-bold text-gray6">subscribers</p>
              <p className="font-bold text-blue">visit channel</p>
            </div>
          </div>

          <div className="flex">
            <div onClick={() => openStep(4)} className="mr-[27px] flex">
              <Image
                src="/images/twitter-icon.svg"
                width={74}
                height={74}
                alt="twitter icon"
              />
            </div>

            <div className="flex flex-col">
              <p className="font-bold text-[45px]">3.87M</p>
              <p className="font-bold text-gray6">subscribers</p>
              <p className="font-bold text-blue">visit channel</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex mb-[90px]">
            <div onClick={() => openStep(5)} className="mr-[27px] flex">
              <Image
                src="/images/twitch-icon.svg"
                width={74}
                height={58}
                alt="twitch icon"
              />
            </div>

            <div className="flex flex-col">
              <p className="font-bold text-[45px]">3.87M</p>
              <p className="font-bold text-gray6">subscribers</p>
              <p className="font-bold text-blue">visit channel</p>
            </div>
          </div>

          <div className="flex">
            <div onClick={() => openStep(6)} className="mr-[27px] flex">
              <Image
                src="/images/discord-icon.svg"
                width={74}
                height={65}
                alt="discord icon"
              />
            </div>

            <div className="flex flex-col">
              <p className="font-bold text-[45px]">3.87M</p>
              <p className="font-bold text-gray6">subscribers</p>
              <p className="font-bold text-blue">visit channel</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
