import axios from 'axios';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { SetStateAction, useCallback, useEffect, useState } from 'react';
import * as yup from 'yup';

import Button from './Button';
import Categories from './Categories';
import CategoriesInput from './CategoriesInput';
import ErrorLabel from './ErrorLabel';

interface EditProfileModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  description: string;
  categories: string[];
  handle: string;
  setIsLoading: (value: boolean) => void;
  setIsError: (value: boolean) => void;
}

export default function EditProfileModal({
  isOpen,
  setIsOpen,
  description,
  categories,
  handle,
  setIsLoading,
  setIsError,
}: EditProfileModalProps) {
  const [categoriesList, setCategoriesList] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [handleError, setHandleError] = useState('');
  const { push } = useRouter();

  function closeModal() {
    setIsOpen(false);
  }

  const formik = useFormik({
    initialValues: {
      description: '',
      handle: '',
    },
    validationSchema: yup.object().shape({
      description: yup.string().required('description required'),
      handle: yup.string().required('handle required'),
    }),
    onSubmit: async (values) => {
      const readProfileByHandle = await axios.get(
        '/api/cobogo/readProfileByHandle',
        {
          params: {
            handle: values.handle,
          },
        },
      );

      if (readProfileByHandle.data.error) {
        setIsError(true);
      }

      if (!readProfileByHandle.data.data) {
        setIsLoading(true);

        const queryRef = sessionStorage.getItem('queryRef');

        await axios
          .post('/api/cobogo/updateProfile', {
            description: values.description,
            handle: values.handle,
            categories: categoriesList.toString(),
            queryRef: queryRef || null,
          })
          .then((response) => {
            if (response.data.error) {
              setIsError(true);
            }

            push(`/${values.handle}`);
            setIsLoading(false);
            setIsOpen(false);
          });
      } else if (formik.values.handle !== handle) {
        setIsLoading(false);
        setHandleError('handle already exists');
      } else {
        setIsLoading(true);

        const queryRef = sessionStorage.getItem('queryRef');

        await axios
          .post('/api/cobogo/updateProfile', {
            description: values.description,
            handle: values.handle,
            categories: categoriesList.toString(),
            queryRef: queryRef || null,
          })
          .then((response) => {
            if (response.data.error) {
              setIsError(true);
            }

            push(`/${values.handle}`);
            setIsLoading(false);
            setIsOpen(false);
          });
      }
    },
  });

  function handleChangeCategories(event: {
    target: { value: SetStateAction<string> };
    key: string;
  }) {
    setInput(event.target.value);

    if (event.key === 'Enter') {
      if (categoriesList.length === 5) {
        return;
      }

      if (input) {
        const isDuplicated = categoriesList.filter((c) => c === input);

        if (isDuplicated.length === 0) {
          setCategoriesList([...categoriesList, input]);
          setInput('');
        }
      }
    }
  }

  function handleRemoveCategory(category: string) {
    setCategoriesList(categoriesList.filter((c) => c !== category));
  }

  function handleRequest(event: { key: string }) {
    if (event.key === 'Enter') {
      return;
    }
  }

  function handleValidateKeyPressedInDescription(event) {
    const keyPressed = event.key;

    if (keyPressed === 'Enter') {
      event.preventDefault();
    }
  }

  function handleValidateKeyPressedInHandle(event) {
    const keyPressed = event.key;

    if (
      '1234567890qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM-'.indexOf(
        keyPressed,
      ) < 0
    ) {
      event.preventDefault();
    }
  }

  const setCurrentValues = useCallback(() => {
    formik.values.description = description;
    formik.values.handle = handle;
    setCategoriesList(categories);
  }, [categories, description, formik.values, handle]);

  useEffect(() => {
    setCurrentValues();
  }, [setCurrentValues]);

  return isOpen ? (
    <div className="w-screen h-screen fixed top-0 right-0 z-10 flex justify-center items-center bg-black/[0.5]">
      <div className="relative bg-primary w-full h-full sm:w-[550px] sm:h-[745px] flex flex-col justify-center border-[1.5px] border-gray5 px-[40px] sm:px-[70px]">
        <div className="flex flex-col items-start justify-center">
          <div
            onClick={closeModal}
            className="absolute top-10 sm:top-0 right-0 mt-[20px] mr-[20px] hover:cursor-pointer"
          >
            <Image
              src="/images/x2-icon.svg"
              width={13}
              height={13}
              alt="x2 icon"
            />
          </div>

          <p className="text-white text-[40px]">edit profile</p>

          <p className="text-white text-[22px] max-w-[438px] mb-4">
            write a description to be visible on your public profile.
          </p>

          <form className="flex flex-col w-full" onSubmit={formik.handleSubmit}>
            <div className="relative">
              {formik.touched.description && formik.errors.description ? (
                <ErrorLabel error={formik.errors.description} />
              ) : null}

              <textarea
                id="description"
                name="description"
                className={`w-full sm:w-[432px] h-32 bg-black border-[1.5px] mb-8 p-2 outline-none text-white ${
                  formik.touched.description && formik.errors.description
                    ? 'border-red'
                    : 'border-gray5'
                }`}
                onChange={formik.handleChange}
                onKeyPress={handleValidateKeyPressedInDescription}
                value={formik.values.description}
              />
            </div>

            <label htmlFor="handle" className="text-[22px] text-white sm:mb-4">
              choose a handle
            </label>

            <p className="mb-4 text-sm break-words text-gray3 sm:hidden">
              app.cobogo.social/{formik.values.handle}
            </p>

            <div className="flex">
              <div className="px-4 h-12 bg-secondary hidden sm:flex justify-center items-center border-[1.5px] border-r-0 border-gray5">
                <p className="font-bold text-white">app.cobogo.social/</p>
              </div>

              <div className="relative w-full">
                {(formik.touched.handle && formik.errors.handle) ||
                handleError ? (
                  <ErrorLabel error={formik.errors.handle || handleError} />
                ) : null}

                <input
                  id="handle"
                  name="handle"
                  type="text"
                  className={`w-full h-12 bg-black border-[1.5px] sm:border-l-0  mb-8 p-2 outline-none text-white ${
                    (formik.touched.handle && formik.errors.handle) ||
                    handleError
                      ? 'border-red'
                      : 'border-gray5'
                  }`}
                  onChange={formik.handleChange}
                  onKeyPress={handleValidateKeyPressedInHandle}
                  value={formik.values.handle}
                />
              </div>
            </div>

            <p className="mb-4 text-[22px] text-white">choose tag's</p>

            <CategoriesInput
              input={input}
              handleChangeCategories={handleChangeCategories}
            />

            <Categories
              categories={categoriesList}
              removeCategory={handleRemoveCategory}
            />

            <Button
              text="save"
              color="bg-blue"
              hoverColor="brightness-90"
              width="w-[76px]"
              height="h-[38px]"
              onClick={handleRequest}
              onKeyDown={handleRequest}
            />
          </form>
        </div>
      </div>
    </div>
  ) : null;
}
