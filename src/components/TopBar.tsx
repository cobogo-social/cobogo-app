import { WalletContext } from '@contexts/WalletContext';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { IoCopySharp } from 'react-icons/io5';

import Button from './Button';
import Link from './Link';
import MetaMask from './MetaMask';
import StepItem from './StepItem';
import TokenInfo from './TokenInfo';

interface TopBarProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categories?: any[];
  searchByCategory?: (categoryId: number) => void;
  noLogo?: boolean;
  noOnboardedFriends?: boolean;
  setOnboardedFriendsChannels?: (value: []) => void;
  setPendingFriendsChannels?: (value: []) => void;
  noSteps?: boolean;
  noLogout?: boolean;
  noConnectWallet?: boolean;
  noTokens?: boolean;
  onboardedFriends?: number;
  tokens?: number;
  referralCode?: string;
}

export default function TopBar({
  categories,
  searchByCategory,
  noLogo,
  noOnboardedFriends,
  setOnboardedFriendsChannels,
  setPendingFriendsChannels,
  noSteps,
  noLogout,
  noConnectWallet,
  noTokens,
  onboardedFriends,
  tokens,
  referralCode,
}: TopBarProps) {
  const { asPath } = useRouter();
  const [openReferralMenu, setOpenReferralMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [openCategoriesMenu, setOpenCategoriesMenu] = useState(false);
  const { currentWallet, connectMetaMaskWallet } = useContext(WalletContext);
  const [back, setBack] = useState(false);
  const [open, setOpen] = useState(false);
  const { push } = useRouter();

  function changeBackAndChangeOpen() {
    setBack(!back);
    setOpen(!open);
  }

  function logout() {
    signOut();
    push('/submit/connect');
  }

  function openOrCloseCategoriesMenu() {
    setOpenCategoriesMenu(!openCategoriesMenu);
  }

  function openOrCloseReferralMenu() {
    setOpenReferralMenu(!openReferralMenu);
  }

  function copyToClipboard() {
    setCopied(true);
  }

  return (
    <>
      <div
        className={`h-[100px] w-full hidden sm:flex ${
          noLogo ? 'justify-end items-start' : 'justify-between items-center'
        } px-[39px]`}
      >
        {!noLogo && (
          <div className="flex">
            <Link href="/" className="flex">
              <Image
                src="/images/logo.svg"
                width={120}
                height={27}
                alt="logo"
              />
            </Link>
          </div>
        )}

        <div className="flex items-center justify-center">
          {!asPath.includes('submit') && (
            <div className="ml-[40px]">
              <Link href="/submit">
                <Button
                  text="submit a channel"
                  color="bg-purple"
                  width="w-[174px]"
                  height="h-[38px]"
                />
              </Link>
            </div>
          )}

          {!noOnboardedFriends && (
            <p className="ml-[40px]">
              onboarded friends:{' '}
              <span className="font-bold text-green">{onboardedFriends}</span>
            </p>
          )}

          {!noTokens && tokens ? (
            <div className="ml-[40px]">
              <TokenInfo tokens={tokens} />
            </div>
          ) : null}

          {!noConnectWallet && (
            <div className="flex items-center justify-center hover:cursor-pointer ml-[40px]">
              <MetaMask
                setOnboardedFriendsChannels={setOnboardedFriendsChannels}
                setPendingFriendsChannels={setPendingFriendsChannels}
              />
            </div>
          )}
        </div>
      </div>

      {!asPath.includes('submit') ? (
        <div className="fixed z-20 flex flex-col items-center justify-between w-screen">
          <div className="bg-secondary p-4 w-full h-[52px] flex justify-between items-center sm:hidden shadow-[0_0px_10px_15px_rgba(0,0,0,0.3)]">
            <div className="flex">
              {categories && (
                <div className="flex mr-4" onClick={openOrCloseCategoriesMenu}>
                  <Image
                    src="/images/menu-icon.svg"
                    width={22}
                    height={18}
                    alt="menu icon"
                  />
                </div>
              )}

              <div className="flex">
                <Link href="/" className="flex">
                  <Image
                    src="/images/logo.svg"
                    width={100}
                    height={22}
                    alt="cobogo logo"
                  />
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="mr-[20px]">
                <Link href="/submit">
                  <Button
                    text="submit"
                    color="bg-purple"
                    width="w-[68px]"
                    height="h-[26px]"
                  />
                </Link>
              </div>

              {currentWallet ? (
                <div className="flex items-center justify-center">
                  <Image
                    src="/images/metamask-small-icon.svg"
                    width={32}
                    height={32}
                    alt="metamask small icon"
                  />

                  <div className="flex w-[9px] h-[9px] bg-green mx-2 rounded-full" />

                  <div
                    onClick={openOrCloseReferralMenu}
                    className="flex hover:cursor-pointer"
                  >
                    <Image
                      src="/images/menu-icon.svg"
                      width={22}
                      height={18}
                      alt="menu icon"
                    />
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => connectMetaMaskWallet()}
                  className="flex mr-2 font-bold"
                >
                  connect wallet
                </button>
              )}
            </div>
          </div>

          {openReferralMenu && (
            <div className="flex items-center justify-center w-full bg-secondary">
              <div className="bg-gray w-full h-[143px] m-[10px] sm:hidden shadow-[0_0px_10px_15px_rgba(0,0,0,0.3)] px-[20px] py-[15px]">
                <div className="flex items-center justify-between mb-[22px]">
                  <p>
                    onboarded friends: (
                    <span className="text-green">{onboardedFriends}</span>)
                  </p>

                  <TokenInfo tokens={tokens} />
                </div>

                <div className="flex flex-col justify-center sm:hidden">
                  <p className="mb-[7px] font-bold">your referral link</p>

                  <div className="flex">
                    <div className="px-4 w-full h-[36px] bg-black flex justify-start items-center border-[1.5px] border-r-0 border-gray10">
                      <p className="text-xs font-bold text-blue sm:text-sm">
                        app.cobogo.social/submit?ref={referralCode}
                      </p>
                    </div>

                    <div
                      onClick={copyToClipboard}
                      className="pr-4 h-[36px] bg-black border-[1.5px] border-l-0 border-gray10 outline-none flex justify-center items-center"
                    >
                      <CopyToClipboard
                        text={`https://app.cobogo.social/submit?ref=${referralCode}`}
                      >
                        {copied ? (
                          <Image
                            src="/images/success-icon.svg"
                            width={11.5}
                            height={11.5}
                            alt="error icon"
                          />
                        ) : (
                          <IoCopySharp
                            className="hover:cursor-pointer"
                            color="white"
                          />
                        )}
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="bg-secondary z-20 p-4 w-screen h-[52px] flex justify-between items-center fixed sm:hidden shadow-[0_0px_10px_15px_rgba(0,0,0,0.3)]">
            <div className="flex">
              {!noSteps && (
                <div className="flex mr-4" onClick={changeBackAndChangeOpen}>
                  <Image
                    src={
                      back ? '/images/back-icon.svg' : '/images/next-icon.svg'
                    }
                    width={28}
                    height={28}
                    alt="back or next icon"
                  />
                </div>
              )}

              <div className="flex">
                <Link href="/" className="flex">
                  <Image
                    src="/images/logo.svg"
                    width={100}
                    height={22}
                    alt="cobogo logo"
                  />
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-center">
              {!noLogout && (
                <button
                  onClick={logout}
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
              className={`bg-secondary z-10 px-[10px] pb-8 pt-[72px] h-screen fixed sm:hidden ${
                open ? 'w-[193px]' : 'w-[52px]'
              } ${open ? '' : 'flex'} flex-col justify-start items-center`}
            >
              <StepItem
                number="1"
                text="connect"
                href="/submit/connect"
                open={open}
              />

              <StepItem
                number="2"
                text="create profile"
                href="/submit/create-profile"
                open={open}
              />

              <StepItem
                number="3"
                text="connect wallet"
                href="/submit/connect-wallet"
                open={open}
              />

              <StepItem
                number="4"
                text="invite and share"
                href="/submit/invite-and-share"
                open={open}
              />

              <StepItem
                number="5"
                text="success"
                href="/submit/success"
                open={open}
              />
            </div>
          )}
        </>
      )}

      {openCategoriesMenu && (
        <div className="fixed z-10 flex-col items-center justify-start w-[193px] h-screen bg-secondary sm:hidden px-[10px] pb-8 pt-20 shadow-[0_0px_10px_15px_rgba(0,0,0,0.3)]">
          <p className="text-[22px] mb-[31px]">categories</p>

          <div className="flex flex-col items-start text-gray3">
            {categories &&
              categories.map((category) => (
                <button
                  key={category.id}
                  className="mb-[15px] hover:cursor-pointer"
                  onClick={() => searchByCategory(category.id)}
                >
                  {category.attributes.name}
                </button>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
