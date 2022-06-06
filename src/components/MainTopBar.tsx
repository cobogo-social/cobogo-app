import { ErrorContext } from '@contexts/ErrorContext';
import { LoadingContext } from '@contexts/LoadingContext';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { IoCopySharp } from 'react-icons/io5';

import Button from './Button';
import DisconnectWalletModal from './DisconnectWalletModal';
import Link from './Link';
import MetaMask from './MetaMask';
import TokenInfo from './TokenInfo';

interface MainTopBarProps {
  connectWallet: () => void;
  currentWallet: string;
  setCurrentWallet: (value: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categories?: any[];
  searchByCategory?: (categoryId: number) => void;
}

export default function MainTopBar({
  connectWallet,
  currentWallet,
  setCurrentWallet,
  categories,
  searchByCategory,
}: MainTopBarProps) {
  const { asPath } = useRouter();
  const [disconnectWalletModalIsOpen, setDisconnectWalletModalIsOpen] =
    useState(false);
  const { setLoading } = useContext(LoadingContext);
  const [openReferralMenu, setOpenReferralMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [onboardedFriends, setOnboardedFriends] = useState(0);
  const [referralCode, setReferralCode] = useState('');
  const [tokens, setTokens] = useState(0);
  const [openCategoriesMenu, setOpenCategoriesMenu] = useState(false);
  const { setError } = useContext(ErrorContext);

  function openDisconnectWalletModal() {
    setDisconnectWalletModalIsOpen(true);
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

  const getInfoToReferralMenu = useCallback(async () => {
    try {
      if (currentWallet) {
        await axios
          .get('/api/cobogo/readAccountByWallet', {
            params: {
              walletAddress: currentWallet,
            },
          })
          .then(async (response) => {
            if (response.data.data) {
              const account = response.data.data;

              const accountsByReferralId = await axios.get(
                '/api/cobogo/readAccountsByReferralId',
                {
                  params: {
                    referralId: account.id,
                  },
                },
              );

              accountsByReferralId.data.data.forEach((accountByReferralId) => {
                const waitlisted =
                  accountByReferralId.attributes.profiles.data[0].attributes
                    .waitlist;

                if (waitlisted) {
                  setOnboardedFriends((c) => c + 1);
                }
              });
              setReferralCode(response.data.data.attributes.referral_code);
              setTokens(response.data.data.attributes.tokens);
            }
          });
      }
    } catch (error) {
      setError(error.message);
    }
  }, [currentWallet, setError]);

  useEffect(() => {
    getInfoToReferralMenu();
  }, [currentWallet, getInfoToReferralMenu]);

  return (
    <>
      <DisconnectWalletModal
        setCurrentWallet={setCurrentWallet}
        isOpen={disconnectWalletModalIsOpen}
        setIsOpen={setDisconnectWalletModalIsOpen}
      />

      <div className="h-[100px] w-full hidden sm:flex justify-between items-center px-[39px]">
        <Image src="/images/logo.svg" width={120} height={27} alt="logo" />

        <div className="flex items-center justify-center">
          {asPath !== '/' && (
            <Link href="/">
              <button className="font-bold mr-[40px]">back to home</button>
            </Link>
          )}

          <div className="mr-[40px]">
            <Link href="/submit">
              <Button
                text="submit a channel"
                color="bg-purple"
                width="w-[174px]"
                height="h-[38px]"
                onClick={() => setLoading(true)}
              />
            </Link>
          </div>

          <div className="flex items-center justify-center hover:cursor-pointer">
            {currentWallet ? (
              <MetaMask
                currentWallet={currentWallet}
                openDisconnectWalletModal={openDisconnectWalletModal}
              />
            ) : (
              <button onClick={connectWallet} className="font-bold">
                connect wallet
              </button>
            )}
          </div>
        </div>
      </div>

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
            <Image
              src="/images/logo.svg"
              width={100}
              height={22}
              alt="cobogo logo"
            />
          </div>

          <div className="flex items-center justify-center">
            <div className="mr-[20px]">
              <Link href="/submit">
                <Button
                  text="submit"
                  color="bg-purple"
                  width="w-[68px]"
                  height="h-[26px]"
                  onClick={() => setLoading(true)}
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
              <div className="flex items-center justify-center">
                <button onClick={connectWallet} className="flex mr-2 font-bold">
                  connect wallet
                </button>
                <div className="bg-white w-[9px] h-[9px] rounded-full" />
              </div>
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
