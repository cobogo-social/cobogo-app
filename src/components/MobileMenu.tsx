import Image from 'next/image';
import { useState } from 'react';

import MobileStepItem from './MobileStepItem';

export default function MobileMenu() {
  const [back, setBack] = useState(false);
  const [open, setOpen] = useState(false);

  function setBackAndSetOpen() {
    setBack(!back);
    setOpen(!open);
  }

  return (
    <>
      <div className="bg-secondary z-20 p-4 w-screen h-[52px] flex justify-between items-center fixed sm:hidden shadow-[0_0px_10px_15px_rgba(0,0,0,0.3)]">
        <div className="flex">
          <div className="flex mr-4" onClick={setBackAndSetOpen}>
            <Image
              src={back ? '/images/back-icon.svg' : '/images/next-icon.svg'}
              width={28}
              height={28}
            />
          </div>

          <Image
            src="/images/logo.svg"
            width={100}
            height={22}
            alt="cobogo logo"
          />
        </div>

        <div className="bg-white w-[9px] h-[9px] rounded-full" />
      </div>

      <div
        className={`bg-secondary z-10 p-8 pt-20 h-screen fixed sm:hidden ${
          open ? 'w-[193px]' : 'w-[52px]'
        } ${open ? '' : 'flex'} flex-col justify-start items-center`}
      >
        <MobileStepItem
          number="1"
          text="connect"
          href="/submit/connect"
          open={open}
        />

        <MobileStepItem
          number="2"
          text="create profile"
          href="/submit/create-profile"
          open={open}
        />

        <MobileStepItem
          number="3"
          text="video"
          href="/submit/video"
          open={open}
        />

        <MobileStepItem
          number="4"
          text="invite"
          href="/submit/invite"
          open={open}
        />

        <MobileStepItem
          number="5"
          text="success"
          href="/submit/success"
          open={open}
        />
      </div>
    </>
  );
}
