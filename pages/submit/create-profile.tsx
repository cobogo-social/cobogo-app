import Button from '@components/Button';
import CategoriesSelect from '@components/CategoriesSelect';
import ChannelBox from '@components/ChannelBox';
import ErrorLabel from '@components/ErrorLabel';
import ErrorModal from '@components/ErrorModal';
import Footer from '@components/Footer';
import Loading from '@components/Loading';
import MobileSubmitMenu from '@components/MobileSubmitMenu';
import PageContainer from '@components/PageContainer';
import StepContainer from '@components/StepContainer';
import StepsMenu from '@components/StepsMenu';
import StepSubContainer from '@components/StepSubContainer';
import Tags from '@components/Tags';
import TagsInput from '@components/TagsInput';
import TopBar from '@components/TopBar';
import {
  readAccountByYoutubeAccountId,
  readCategories,
} from '@services/cobogoApi';
import axios from 'axios';
import { useFormik } from 'formik';
import { GetServerSideProps } from 'next';
import { getSession, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { SetStateAction, useCallback, useEffect, useState } from 'react';
import * as yup from 'yup';

interface CreateProfileProps {
  bannerImage: string;
  title: string;
  youtubeDescription: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categories: any[];
}

export default function Index({
  bannerImage,
  title,
  youtubeDescription,
  categories,
}: CreateProfileProps) {
  const { data: session } = useSession();
  const [tagsList, setTagsList] = useState<string[]>([]);
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
            categories: tagsList.toString(),
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

  function changeCategory(event: {
    target: { value: SetStateAction<string> };
    key: string;
  }) {
    setCategoryValue(event.target.value);
  }

  function removeTag(tag: string) {
    setTagsList(tagsList.filter((c) => c !== tag));
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
    formik.values.description = youtubeDescription;
  }, [youtubeDescription]);

  useEffect(() => {
    if (createdProfile) {
      push('/submit/connect-wallet');
    }
  }, [push, createdProfile]);

  useEffect(() => {
    setCurrentValues();
  }, [setCurrentValues]);

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signIn('google');
    }
  }, [session]);

  return (
    <>
      <Loading isLoading={isLoading} />
      <ErrorModal isOpen={isError} setIsOpen={setIsError} />

      <div className="w-full">
        <PageContainer>
          <StepsMenu />

          <MobileSubmitMenu />

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

                <TagsInput input={tagInput} changeTags={changeTags} />

                <Tags tags={tagsList} removeTag={removeTag} />

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

          <Footer />
        </PageContainer>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.user) {
    return {
      redirect: {
        destination: '/submit/connect',
        permanent: false,
      },
    };
  }

  const account = await readAccountByYoutubeAccountId(session.user['id']);
  const profile = account.attributes.profiles.data[0];

  if (!profile) {
    return {
      redirect: {
        destination: '/submit/connect',
        permanent: false,
      },
    };
  }

  if (profile.attributes.handle) {
    return {
      redirect: {
        destination: '/submit/connect-wallet',
        permanent: false,
      },
    };
  }

  const categories = await readCategories();

  return {
    props: {
      bannerImage: profile.attributes.banner_image,
      title: profile.attributes.title,
      youtubeDescription: profile.attributes.youtube_description,
      categories,
    },
  };
};
