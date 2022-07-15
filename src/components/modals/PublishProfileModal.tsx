import Button from '@components/Button';
import ModalContainer from '@components/containers/ModalContainer';
import SuccessBullet from '@components/SuccessBullet';
import WarningBullet from '@components/WarningBullet';
import { LoadingContext } from '@contexts/LoadingContext';
import { MessageContext } from '@contexts/MessageContext';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

interface PublishProfileModalProps {
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

export default function PublishProfileModal(props: PublishProfileModalProps) {
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [descriptionLengthStatus, setDescriptionLengthStatus] = useState(1);
  const [tagsLengthStatus, setTagsLengthStatus] = useState(1);
  const [servicesLengthStatus, setServicesLengthStatus] = useState(1);
  const [hasTwoHandleStatus, setHasTwoHandleStatus] = useState(1);

  const { push } = useRouter();

  const { setMessage } = useContext(MessageContext);
  const { setLoading } = useContext(LoadingContext);

  async function publishProfile() {
    if (
      descriptionLengthStatus === 2 &&
      tagsLengthStatus === 2 &&
      servicesLengthStatus === 2 &&
      hasTwoHandleStatus === 2
    ) {
      try {
        setLoading(true);
        setProfileCompleted(true);

        await axios
          .post('/api/cobogo/updateProfile', {
            status: 'published',
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
    }
  }

  function closeModal() {
    props.setOpen(false);
  }

  useEffect(() => {
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

    descriptionLength >= 140 && setDescriptionLengthStatus(2);
    tagsLength >= 3 && setTagsLengthStatus(2);
    servicesLength >= 1 && setServicesLengthStatus(2);
    hasTwoHandles && setHasTwoHandleStatus(2);

    if (
      descriptionLengthStatus === 2 &&
      tagsLengthStatus === 2 &&
      servicesLengthStatus === 2 &&
      hasTwoHandleStatus === 2
    ) {
      setProfileCompleted(true);
    }
  }, [
    descriptionLengthStatus,
    hasTwoHandleStatus,
    props.description,
    props.discordHandle,
    props.instagramHandle,
    props.services.length,
    props.tags.length,
    props.telegramHandle,
    props.tiktokHandle,
    props.twitchHandle,
    props.twitterHandle,
    servicesLengthStatus,
    tagsLengthStatus,
  ]);

  useEffect(() => {
    if (props.open) {
      document.body.classList.add('active-modal');
    } else {
      document.body.classList.remove('active-modal');
    }
  }, [props.open]);

  return props.open ? (
    <ModalContainer>
      <div
        onClick={closeModal}
        className="absolute top-0 right-0 mt-[20px] mr-[20px] hover:cursor-pointer"
      >
        <Image src="/images/x2-icon.svg" width={13} height={13} alt="x2 icon" />
      </div>

      <div>
        <p className="mb-6 text-[40px]">publish profile</p>

        <p className="text-xl sm:w-[408px] mb-10">
          if you want to publish your profile and earn <strong>50 CBG</strong>,
          it needs to meet the following minimum requirements:
        </p>

        <div className="mb-10">
          {descriptionLengthStatus === 1 && (
            <WarningBullet text="write at least 140 characters in the description" />
          )}

          {descriptionLengthStatus === 2 && (
            <SuccessBullet text="write at least 140 characters in the description" />
          )}
        </div>

        <div className="mb-10">
          {tagsLengthStatus === 1 && (
            <WarningBullet text="add 3 tags related to your content" />
          )}

          {tagsLengthStatus === 2 && (
            <SuccessBullet text="add 3 tags related to your content" />
          )}
        </div>

        <div className="mb-10">
          {servicesLengthStatus === 1 && (
            <WarningBullet text="add at least 1 more Social Media metrics" />
          )}

          {servicesLengthStatus === 2 && (
            <SuccessBullet text="add at least 1 more Social Media metrics" />
          )}
        </div>

        <div className="mb-10">
          {hasTwoHandleStatus === 1 && (
            <WarningBullet text="describe at least 1 service you could offer to brands" />
          )}

          {hasTwoHandleStatus === 2 && (
            <SuccessBullet text="describe at least 1 service you could offer to brands" />
          )}
        </div>

        <Button
          disabled={!profileCompleted}
          color="bg-blue"
          text="publish profile"
          onClick={publishProfile}
        />
      </div>
    </ModalContainer>
  ) : null;
}
