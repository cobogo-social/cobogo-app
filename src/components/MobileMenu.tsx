import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

import MobileStepItem from './MobileStepItem';

interface MobileMenuProps {
  noSteps?: boolean;
  noLogout?: boolean;
}

export default function MobileMenu({ noSteps, noLogout }: MobileMenuProps) {
  const [back, setBack] = useState(false);
  const [open, setOpen] = useState(false);
  const { push } = useRouter();

  function handleSetBackAndSetOpen() {
    setBack(!back);
    setOpen(!open);
  }

  function handleLogout() {
    signOut();
    push('/submit/connect');
  }

  return (
    <>
      <div className="bg-secondary z-20 p-4 w-screen h-[52px] flex justify-between items-center fixed sm:hidden shadow-[0_0px_10px_15px_rgba(0,0,0,0.3)]">
        <div className="flex">
          {!noSteps && (
            <div className="flex mr-4" onClick={handleSetBackAndSetOpen}>
              <Image
                src={back ? '/images/back-icon.svg' : '/images/next-icon.svg'}
                width={28}
                height={28}
                alt="back or next icon"
              />
            </div>
          )}

          <Image
            src="/images/logo.svg"
            width={100}
            height={22}
            alt="cobogo logo"
          />
        </div>

        <div className="flex items-center justify-center">
          {!noLogout && (
            <button
              onClick={handleLogout}
              className="mr-4 font-bold text-blue hover:cursor-pointer"
            >
              logout
            </button>
          )}

          <div className="bg-white w-[9px] h-[9px] rounded-full" />
        </div>
      </div>

      {!noSteps && (
        <div
          className={`bg-secondary z-10 px-[10px] pb-8 pt-20 h-screen fixed sm:hidden ${
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
      )}
    </>
  );
}
