import TokenInfo from '@components/TokenInfo';
import axios from 'axios';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { IoCopySharp } from 'react-icons/io5';

interface MobileTopBarProps {
  currentAccount: string;
  connectWallet: () => void;
}

export default function MobileTopBar({
  currentAccount,
  connectWallet,
}: MobileTopBarProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [onboardedFriends, setOnboardedFriends] = useState(0);
  const [referralCode, setReferralCode] = useState('');
  const [tokens, setTokens] = useState(0);

  function openOrCloseMenu() {
    setOpen(!open);
  }

  function copyToClipboard() {
    setCopied(true);
  }

  const getInfo = useCallback(async () => {
    if (currentAccount) {
      await axios
        .get('/api/cobogo/readAccountByNameOrYoutubeAccountId', {
          params: {
            name: currentAccount,
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
              console.log(accountByReferralId.attributes.profiles);
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
  }, [currentAccount]);

  useEffect(() => {
    getInfo();
  }, [currentAccount, getInfo]);

  return (
    <div className="fixed z-20 flex flex-col items-center justify-between w-screen">
      <div className="bg-secondary p-4 w-full h-[52px] flex justify-between items-center sm:hidden shadow-[0_0px_10px_15px_rgba(0,0,0,0.3)]">
        <div className="flex">
          <Image
            src="/images/logo.svg"
            width={100}
            height={22}
            alt="cobogo logo"
          />
        </div>

        {currentAccount ? (
          <div className="flex items-center justify-center">
            <Image
              src="/images/metamask-small-icon.svg"
              width={32}
              height={32}
              alt="metamask small icon"
            />

            <div className="flex w-[9px] h-[9px] bg-green mx-2 rounded-full" />

            <div
              onClick={openOrCloseMenu}
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

      {open && (
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
                <div className="px-4 w-full h-[36px] bg-black flex justify-start items-center border-[1.5px] border-r-0 border-gray5">
                  <p className="text-xs font-bold text-blue sm:text-sm">
                    app.cobogo.social/submit?ref={referralCode}
                  </p>
                </div>

                <div
                  onClick={copyToClipboard}
                  className="pr-4 h-[36px] bg-black border-[1.5px] border-l-0 border-gray5 outline-none flex justify-center items-center"
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
  );
}
