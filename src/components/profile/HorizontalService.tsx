import DeleteIcon from '@components/icons/DeleteIcon';
import EditIcon from '@components/icons/EditIcon';
import { LoadingContext } from '@contexts/LoadingContext';
import { MessageContext } from '@contexts/MessageContext';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

interface HorizontalServiceProps {
  serviceId: number;
  name: string;
  description: string;
  route?: string;
  handle: string;
  closeModal: () => void;
}

export default function HorizontalService(props: HorizontalServiceProps) {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const { push } = useRouter();

  const { setMessage } = useContext(MessageContext);
  const { setLoading } = useContext(LoadingContext);

  async function confirmDelete() {
    setDeleteConfirmation(true);
  }

  async function deleteService() {
    try {
      setLoading(true);

      await axios
        .delete('/api/cobogo/deleteService', {
          params: {
            serviceId: props.serviceId,
          },
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

          if (props.closeModal) {
            props.closeModal();
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

  return (
    <div className="flex gap-5">
      <div className="flex flex-col gap-5">
        <p className="text-xl">{props.name}</p>

        <p className="max-w-[270px]">{props.description.slice(0, 115)} (...)</p>
      </div>

      <div className="flex flex-col items-center gap-5">
        <div className="bg-blue w-36 h-24" />

        <div className="flex gap-5">
          {deleteConfirmation ? (
            <div
              onClick={deleteService}
              className="flex hover:cursor-pointer gap-3"
            >
              <p className="text-sm font-bold">are you sure?</p>

              <DeleteIcon size={14} color="red" />
            </div>
          ) : (
            <>
              <div className="flex hover:cursor-pointer">
                <EditIcon size={20} />
              </div>

              <div
                onClick={confirmDelete}
                className="flex hover:cursor-pointer"
              >
                <DeleteIcon size={14} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
