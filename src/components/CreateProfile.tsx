import Button from '@components/Button';
import Categories from '@components/Categories';
import CategoriesInput from '@components/CategoriesInput';
import ChannelBox from '@components/ChannelBox';
import ErrorLabel from '@components/ErrorLabel';
import ErrorModal from '@components/ErrorModal';
import Loading from '@components/Loading';
import StepContainer from '@components/StepContainer';
import StepSubContainer from '@components/StepSubContainer';
import TopBar from '@components/TopBar';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { SetStateAction, useEffect, useState } from 'react';
import * as yup from 'yup';

import CategoriesSelect from './CategoriesSelect';

interface CreateProfileProps {
  bannerImage: string;
  title: string;
  youtubeDescription: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categories: any[];
}

export default function CreateProfile({
  bannerImage,
  title,
  youtubeDescription,
  categories,
}: CreateProfileProps) {
  const [categoriesList, setCategoriesList] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [categoryValue, setCategoryValue] = useState('');
  const [createdProfile, setCreatedProfile] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [handleError, setHandleError] = useState('');
  const { push } = useRouter();

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
            category: categoryValue,
          })
          .then((response) => {
            if (response.data.error) {
              setIsError(true);
            }

            setCreatedProfile(true);
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
        setHandleError('handle already exists');
      }
    },
  });

  function handleChangeCategories(event: {
    target: { value: SetStateAction<string> };
    key: string;
  }) {
    setTagInput(event.target.value);

    if (event.key === 'Enter') {
      if (categoriesList.length === 5) {
        return;
      }

      if (tagInput) {
        const isDuplicated = categoriesList.filter((c) => c === tagInput);

        if (isDuplicated.length === 0) {
          setCategoriesList([...categoriesList, tagInput]);
          setTagInput('');
        }
      }
    }
  }

  function changeCategory(event: {
    target: { value: SetStateAction<string> };
    key: string;
  }) {
    setCategoryValue(event.target.value);
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

  useEffect(() => {
    if (createdProfile) {
      push('/submit/video');
    }
  }, [push, createdProfile]);

  return (
    <>
      <Loading isLoading={isLoading} />
      <ErrorModal isOpen={isError} setIsOpen={setIsError} />

      <StepContainer>
        <TopBar />

        <StepSubContainer>
          <form className="flex flex-col" onSubmit={formik.handleSubmit}>
            <p className="mb-4 text-4xl">create profile</p>

            <label htmlFor="description" className="mb-4 sm:text-lg">
              write a description to be visible on your public profile.
            </label>

            <div className="relative">
              {formik.touched.description && formik.errors.description ? (
                <ErrorLabel error={formik.errors.description} />
              ) : null}

              <textarea
                id="description"
                name="description"
                className={`w-full sm:w-[432px] h-32 bg-black border-[1.5px] ${
                  formik.touched.description && formik.errors.description
                    ? 'border-red'
                    : 'border-gray5'
                } mb-8 p-2 outline-none`}
                onChange={formik.handleChange}
                onKeyPress={handleValidateKeyPressedInDescription}
                value={formik.values.description}
              />
            </div>

            <label htmlFor="handle" className="text-lg sm:mb-4">
              choose a handle
            </label>

            <p className="mb-4 text-sm break-words text-gray3 sm:hidden">
              app.cobogo.social/{formik.values.handle}
            </p>

            <div className="flex">
              <div className="px-4 h-12 bg-secondary hidden sm:flex justify-center items-center border-[1.5px] border-r-0 border-gray5">
                <p className="font-bold">app.cobogo.social/</p>
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
                  onChange={formik.handleChange}
                  onKeyPress={handleValidateKeyPressedInHandle}
                  value={formik.values.handle}
                  className={`w-full h-12 bg-black border-[1.5px] sm:border-l-0 ${
                    (formik.touched.handle && formik.errors.handle) ||
                    handleError
                      ? 'border-red'
                      : 'border-gray5'
                  } mb-8 p-2 outline-none`}
                />
              </div>
            </div>

            <p className="mb-4 text-lg">choose tag's</p>

            {/* TODO: update all components with this name to "TagsInput" and "handleChangeCategories" to "handleChangeTags" */}
            <CategoriesInput
              input={tagInput}
              handleChangeCategories={handleChangeCategories}
            />

            {/* TODO: update all components with this name to "Tags", "categories" to "tags" and "removeCategory" to "removeTag" */}
            <Categories
              categories={categoriesList}
              removeCategory={handleRemoveCategory}
            />

            <p className="mb-4 text-lg">choose a category</p>

            <CategoriesSelect
              categories={categories}
              changeCategory={changeCategory}
            />

            <Button
              text="send to review"
              color="bg-blue"
              width="w-[155px]"
              onClick={handleRequest}
              onKeyDown={handleRequest}
            />
          </form>

          <ChannelBox
            banner={bannerImage}
            title={title}
            description={youtubeDescription}
          />
        </StepSubContainer>
      </StepContainer>
    </>
  );
}
