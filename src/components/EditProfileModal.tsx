import { ErrorContext } from '@contexts/ErrorContext';
import { LoadingContext } from '@contexts/LoadingContext';
import axios from 'axios';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { SetStateAction, useContext, useEffect, useState } from 'react';
import * as yup from 'yup';

import Button from './Button';
import CategoriesSelect from './CategoriesSelect';
import ErrorLabel from './ErrorLabel';
import Tags from './Tags';
import TagsInput from './TagsInput';

interface EditProfileModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  description: string;
  tags: string[];
  handle: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categories: any[];
  categoryName: string;
}

export default function EditProfileModal({
  isOpen,
  setIsOpen,
  description,
  tags,
  handle,
  categories,
  categoryName,
}: EditProfileModalProps) {
  const [tagsList, setTagsList] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [handleError, setHandleError] = useState('');
  const [categoryValue, setCategoryValue] = useState('');
  const { push } = useRouter();
  const { setLoading } = useContext(LoadingContext);
  const { setError } = useContext(ErrorContext);

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
      try {
        const readProfileByHandle = await axios.get(
          '/api/cobogo/readProfileByHandle',
          {
            params: {
              handle: values.handle,
            },
          },
        );

        if (readProfileByHandle.data.error) {
          setError(readProfileByHandle.data.error);
        }

        if (!readProfileByHandle.data.data) {
          setLoading(true);

          const queryRef = sessionStorage.getItem('queryRef');

          await axios
            .post('/api/cobogo/updateProfile', {
              description: values.description,
              handle: values.handle,
              categories: tagsList.toString(),
              queryRef: queryRef || null,
              category: categoryValue,
            })
            .then((response) => {
              if (response.data.error) {
                setError(response.data.error);
              }

              push(`/${values.handle}`);
              setLoading(false);
              setIsOpen(false);
            });
        } else if (formik.values.handle !== handle) {
          setLoading(false);
          setHandleError('handle already exists');
        } else {
          setLoading(true);

          const queryRef = sessionStorage.getItem('queryRef');

          await axios
            .post('/api/cobogo/updateProfile', {
              description: values.description,
              handle: values.handle,
              categories: tagsList.toString(),
              queryRef: queryRef || null,
              category: categoryValue,
            })
            .then((response) => {
              if (response.data.error) {
                setError(response.data.error);
              }

              push(`/${values.handle}`);
              setLoading(false);
              setIsOpen(false);
            });
        }
      } catch (error) {
        setError(error.message);
      }
    },
  });

  function changeTags(event: {
    target: { value: SetStateAction<string> };
    key: string;
  }) {
    setTagInput(event.target.value);

    if (event.key === 'Enter') {
      if (tagsList.length === 5) {
        return;
      }

      if (tagInput) {
        const isDuplicated = tagsList.filter((c) => c === tagInput);

        if (isDuplicated.length === 0) {
          setTagsList([...tagsList, tagInput]);
          setTagInput('');
        }
      }
    }
  }

  function removeTag(tag: string) {
    setTagsList(tagsList.filter((c) => c !== tag));
  }

  function request(event: { key: string }) {
    if (event.key === 'Enter') {
      return;
    }
  }

  function validateKeyPressedInDescription(event) {
    const keyPressed = event.key;

    if (keyPressed === 'Enter') {
      event.preventDefault();
    }
  }

  function validateKeyPressedInHandle(event) {
    const keyPressed = event.key;

    if (
      '1234567890qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM-'.indexOf(
        keyPressed,
      ) < 0
    ) {
      event.preventDefault();
    }
  }

  function changeCategory(event: {
    target: { value: SetStateAction<string> };
    key: string;
  }) {
    setCategoryValue(event.target.value);
  }

  useEffect(() => {
    setTagsList(tags);
  }, [tags]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('active-modal');
    } else {
      document.body.classList.remove('active-modal');
    }
  }, [isOpen]);

  return isOpen ? (
    <div className="w-screen h-screen fixed top-0 right-0 z-10 flex justify-center items-center bg-black/[0.5]">
      <div className="relative bg-primary w-full h-full sm:w-[550px] sm:h-[858px] flex flex-col justify-center border-[1.5px] border-gray10 px-[40px] sm:px-[70px] shadow-[0_0px_4px_10px_rgba(0,0,0,0.4)]">
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
                className={`w-full h-32 bg-gray7 border-[1.5px] mb-8 p-2 outline-none text-white ${
                  formik.touched.description && formik.errors.description
                    ? 'border-red'
                    : 'border-gray10'
                }`}
                onChange={formik.handleChange}
                onKeyPress={validateKeyPressedInDescription}
                value={
                  !formik.values.description
                    ? description
                    : formik.values.description
                }
              />
            </div>

            <label htmlFor="handle" className="text-[22px] text-white sm:mb-4">
              choose a handle
            </label>

            <p className="mb-4 text-sm break-words text-gray3 sm:hidden">
              app.cobogo.social/{formik.values.handle}
            </p>

            <div className="flex">
              <div className="px-4 h-12 bg-secondary hidden sm:flex justify-center items-center border-[1.5px] border-r-0 border-gray10">
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
                  className={`w-full h-12 bg-gray7 border-[1.5px] sm:border-l-0  mb-8 p-2 outline-none text-white ${
                    (formik.touched.handle && formik.errors.handle) ||
                    handleError
                      ? 'border-red'
                      : 'border-gray10'
                  }`}
                  onChange={formik.handleChange}
                  onKeyPress={validateKeyPressedInHandle}
                  value={!formik.values.handle ? handle : formik.values.handle}
                />
              </div>
            </div>

            <p className="mb-4 text-[22px] text-white">choose up to 5 tags</p>

            <TagsInput
              input={tagInput}
              changeTags={changeTags}
              tags={tagsList}
            />

            <Tags tags={tagsList} removeTag={removeTag} />

            <p className="mb-4 text-[22px]">choose a category</p>

            <CategoriesSelect
              categories={categories}
              changeCategory={changeCategory}
              categoryName={categoryName}
            />

            <Button
              text="save"
              color="bg-blue"
              width="w-[76px]"
              height="h-[38px]"
              onClick={request}
              onKeyDown={request}
            />
          </form>
        </div>
      </div>
    </div>
  ) : null;
}
