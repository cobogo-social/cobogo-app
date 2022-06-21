import Image from 'next/image';

import Button from './Button';

export default function ProfileAbout(): JSX.Element {
  return (
    <div>
      <div className="w-full h-[308px] bg-gradient-to-t from-blue to-blue/[0.0]" />

      <div className="flex w-full px-[150px] py-[70px] relative justify-center items-end bg-black">
        <div className="flex hover:cursor-pointer absolute top-[30px] left-[30px]">
          <Image
            src="/images/edit-icon.svg"
            width={30}
            height={28}
            alt="edit icon"
          />
        </div>

        <div className="flex max-w-[1000px] w-full justify-between items-end">
          <div className="flex justify-center items-center absolute top-[-30px]">
            <div className="w-[140px] h-[140px] bg-blue mr-[30px] shadow-[0_0px_4px_4px_rgba(0,0,0,0.25)]" />

            <div className="flex flex-col">
              <p className="text-[34px]">
                Thiago Machado{' '}
                <Image
                  src="/images/success-icon.svg"
                  width={22}
                  height={22}
                  alt="success icon"
                />
              </p>

              <p className="text-[20px] text-gray6 font-bold">@thiago0x01</p>
            </div>
          </div>

          <div>
            <p className="text-[22px]">about</p>

            <p className="w-[464px] mb-[30px]">
              Follow the latest Rocket launch webcasts, Conferences & more
              space-related Livestream events. SPACE (Official) provides a
              Platform for Aerospace companies, nonprofit organizations &
              scientists to communicate their work to the general public,
              decreasing the knowledge gap between academia and society.
            </p>

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
              <p className="font-bold text-violet">rocket</p>

              <p className="font-bold text-pink">sky</p>

              <p className="font-bold text-violet">rocket</p>

              <p className="font-bold text-pink">sky</p>

              <p className="font-bold text-violet">rocket</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
