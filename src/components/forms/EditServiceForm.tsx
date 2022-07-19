import Button from '@components/Button';
import ReturnIcon from '@components/icons/ReturnIcon';
import FileInput from '@components/inputs/FileInput';
import { LoadingContext } from '@contexts/LoadingContext';
import { MessageContext } from '@contexts/MessageContext';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import * as yup from 'yup';

import ErrorLabel from '../ErrorLabel';

interface IService {
  id: number;
  title: string;
  description: string;
}

interface EditServiceFormProps {
  baseImageUrl: string;
  title: string;
  buttonText: string;
  route?: string;
  handle: string;
  closeSidebar: () => void;
  returnToServicesSidebar: () => void;
  service: IService;
}

export default function EditServiceForm(props: EditServiceFormProps) {
  const { push } = useRouter();

  const { setMessage } = useContext(MessageContext);
  const { setLoading } = useContext(LoadingContext);

  const [image, setImage] = useState<File>();

  const formik = useFormik({
    initialValues: {
      title: props.service.title,
      description: props.service.description,
    },
    validationSchema: yup.object().shape({
      title: yup.string().required('title required'),
      description: yup.string().required('description required'),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);

        let bannerImage;

        if (image) {
          const file = image;
          const uploadUrl = await axios.get(
            `/api/aws/uploadUrl?prefix=services&fileName=${encodeURIComponent(
              file.name,
            )}&fileType=${encodeURIComponent(file.type)}`,
          );
          const { url, fields } = await uploadUrl.data.data;
          bannerImage = `${props.baseImageUrl}/${fields.key}`;

          const formData = new FormData();

          Object.entries({ ...fields, file }).forEach(([key, value]) => {
            formData.append(key, value as string);
          });

          await axios.post(url, formData);
        }

        await axios
          .put('/api/cobogo/updateService', {
            name: values.title,
            description: values.description,
            serviceId: props.service.id,
            bannerImage,
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

            if (props.closeSidebar) {
              props.closeSidebar();
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
    },
  });

  function request(event: { key: string }) {
    if (event.key === 'Enter') {
      return;
    }
  }

  function validateKeyPressed(event) {
    const keyPressed = event.key;

    if (keyPressed === 'Enter') {
      event.preventDefault();
    }
  }

  return (
    <form
      className="flex flex-col max-w-[432px]"
      onSubmit={formik.handleSubmit}
    >
      <p className="mb-6 text-[40px] flex gap-5 items-center">
        <div onClick={props.returnToServicesSidebar}>
          <ReturnIcon size={12} />
        </div>
        {props.title}
      </p>

      <label htmlFor="title" className="text-lg sm:mb-5">
        title
      </label>

      <div className="relative w-full">
        {formik.touched.title && formik.errors.title ? (
          <ErrorLabel error={formik.errors.title} />
        ) : null}

        <input
          id="title"
          name="title"
          type="text"
          onChange={formik.handleChange}
          onKeyPress={validateKeyPressed}
          value={formik.values.title}
          className={`w-full h-12 bg-gray7 border ${
            formik.touched.title && formik.errors.title
              ? 'border-red'
              : 'border-gray10'
          } mb-10 p-2 outline-none`}
        />
      </div>

      <label htmlFor="description" className="text-xl mb-5">
        write a description
      </label>

      <div className="relative">
        {formik.touched.description && formik.errors.description ? (
          <ErrorLabel error={formik.errors.description} />
        ) : null}

        <textarea
          id="description"
          name="description"
          className={`w-full sm:w-[432px] h-32 bg-gray7 border ${
            formik.touched.description && formik.errors.description
              ? 'border-red'
              : 'border-gray10'
          } mb-10 p-2 outline-none`}
          onChange={formik.handleChange}
          onKeyPress={validateKeyPressed}
          value={formik.values.description}
        />
      </div>

      <div className="mb-10">
        <FileInput
          label="cover"
          description="select an image representing the service."
          changeFile={setImage}
        />
      </div>

      <div className="fixed bottom-0 right-0 w-[600px] h-16 bg-gradient-to-t from-black to-black[0] z-30 px-[70px] py-10 flex items-end">
        <Button
          text={props.buttonText}
          color="bg-blue"
          onClick={request}
          onKeyDown={request}
        />
      </div>
    </form>
  );
}
