import Bullet from '@components/Bullet';
import Button from '@components/Button';
import ModalContainer from '@components/containers/ModalContainer';
import SuccessBullet from '@components/SuccessBullet';
import WarningBullet from '@components/WarningBullet';
import { LoadingContext } from '@contexts/LoadingContext';
import { MessageContext } from '@contexts/MessageContext';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

interface VerifyProfileModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  description: string;
  tags: string[];
  services: unknown[];
  instagramHandle: string;
  twitchHandle: string;
  tiktokHandle: string;
  discordHandle: string;
  telegramHandle: string;
  twitterHandle: string;
  handle: string;
  route?: string;
}

export default function VerifyProfileModal(props: VerifyProfileModalProps) {
  const [profileStatus, setProfileStatus] = useState(1);

  const { push } = useRouter();

  const { setMessage } = useContext(MessageContext);
  const { setLoading } = useContext(LoadingContext);

  async function verifyProfile() {
    const descriptionLength = props.description.split('').length;
    const tagsLength = props.tags.length;
    const servicesLength = props.services.length;
    const hasTwoHandles =
      props.instagramHandle ||
      props.twitchHandle ||
      props.tiktokHandle ||
      props.discordHandle ||
      props.telegramHandle ||
      props.twitterHandle;

    if (
      descriptionLength >= 140 &&
      tagsLength >= 3 &&
      servicesLength >= 1 &&
      hasTwoHandles
    ) {
      try {
        setLoading(true);

        await axios
          .post('/api/cobogo/updateProfile', {
            status: 'verified',
          })
          .then(async (response) => {
            if (response.data.error) {
              setMessage({
                text: response.data.error,
                type: 'error',
              });
            } else {
              await push(props.route ? props.route : `/${props.handle}`);
            }

            setLoading(false);
          });
      } catch (error) {
        setLoading(false);
        setMessage({
          text: error.message,
          type: 'error',
        });
      }

      setProfileStatus(3);
    } else {
      setProfileStatus(2);
    }
  }

  function closeModal() {
    props.setOpen(false);
  }

  return props.open ? (
    <ModalContainer open={props.open}>
      <div
        onClick={closeModal}
        className="absolute top-0 right-0 mt-[20px] mr-[20px] hover:cursor-pointer"
      >
        <Image src="/images/x2-icon.svg" width={13} height={13} alt="x2 icon" />
      </div>

      <div>
        <p className="mb-6 text-[40px]">verify profile</p>

        <p className="text-xl sm:w-[408px] mb-10">
          want to earn <span className="font-bold">fifty CBG Tokens</span>? Your
          profile must have at least:
        </p>

        <div className="mb-10">
          {profileStatus === 1 && (
            <Bullet text="140 characters on description" />
          )}

          {profileStatus === 2 && (
            <WarningBullet text="140 characters on description" />
          )}

          {profileStatus === 3 && (
            <SuccessBullet text="140 characters on description" />
          )}
        </div>

        <div className="mb-10">
          {profileStatus === 1 && <Bullet text="3 tags" />}

          {profileStatus === 2 && <WarningBullet text="3 tags" />}

          {profileStatus === 3 && <SuccessBullet text="3 tags" />}
        </div>

        <div className="mb-10">
          {profileStatus === 1 && <Bullet text="2 socials" />}

          {profileStatus === 2 && <WarningBullet text="2 socials" />}

          {profileStatus === 3 && <SuccessBullet text="2 socials" />}
        </div>

        <div className="mb-10">
          {profileStatus === 1 && <Bullet text="1 service" />}

          {profileStatus === 2 && <WarningBullet text="1 service" />}

          {profileStatus === 3 && <SuccessBullet text="1 service" />}
        </div>

        {profileStatus === 1 && (
          <Button
            color="bg-blue"
            text="verify profile"
            onClick={verifyProfile}
          />
        )}

        {profileStatus === 2 && (
          <Button color="bg-blue" text="verify again" onClick={verifyProfile} />
        )}

        {profileStatus === 3 && (
          <Button color="bg-blue" text="close" onClick={closeModal} />
        )}
      </div>
    </ModalContainer>
  ) : null;
}
