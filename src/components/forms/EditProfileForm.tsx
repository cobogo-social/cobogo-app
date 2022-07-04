import Select from '@components/Select';
import { LoadingContext } from '@contexts/LoadingContext';
import { MessageContext } from '@contexts/MessageContext';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { SetStateAction, useContext, useEffect, useState } from 'react';
import * as yup from 'yup';

import Button from '../Button';
import ErrorLabel from '../ErrorLabel';
import Tags from '../Tags';
import TagsInput from '../TagsInput';

interface EditProfileFormProps {
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categories: any[];
  buttonText: string;
  route?: string;
  title: string;
  handle?: string;
  tags?: string[];
  categoryName?: string;
  edit?: boolean;
  categoryId?: number;
  closeModal?: () => void;
  website?: string;
  presentationVideo?: string;
  languages: string[];
  languageName: string;
  languageId: number;
}

export default function EditProfileForm(props: EditProfileFormProps) {
  const [tagsList, setTagsList] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [categoryValue, setCategoryValue] = useState('');
  const [languageValue, setLanguageValue] = useState('');
  const [handleError, setHandleError] = useState('');

  const { push } = useRouter();

  const { setMessage } = useContext(MessageContext);
  const { setLoading } = useContext(LoadingContext);

  const formik = useFormik({
    initialValues: {
      description: props.description,
      handle: props.handle,
      website: props.website,
      presentationVideo: props.presentationVideo,
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
          setMessage({
            text: readProfileByHandle.data.error,
            type: 'error',
          });
        }

        if (!readProfileByHandle.data.data || props.handle === values.handle) {
          setLoading(true);

          const queryRef = sessionStorage.getItem('queryRef');

          await axios
            .post('/api/cobogo/updateProfile', {
              description: values.description || props.description,
              handle: values.handle || props.handle,
              categories: tagsList.toString(),
              queryRef: queryRef || null,
              category: categoryValue || props.categoryId,
              waitlist: true,
              website: values.website || props.website,
              presentationVideo:
                values.presentationVideo || props.presentationVideo,
              language: languageValue || props.languageId,
            })
            .then(async (response) => {
              if (response.data.error) {
                setMessage({
                  text: response.data.error,
                  type: 'error',
                });
              } else {
                await push(
                  props.route
                    ? props.route
                    : `/${values.handle ? values.handle : props.handle}`,
                );
              }

              if (props.closeModal) {
                props.closeModal();
              }

              setLoading(false);
            });
        } else {
          setLoading(false);
          setHandleError('handle already exists');
        }
      } catch (error) {
        setMessage({
          text: error.message,
          type: 'error',
        });
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

  function changeLanguage(event: {
    target: { value: SetStateAction<string> };
    key: string;
  }) {
    setLanguageValue(event.target.value);
  }

  function removeTag(tag: string) {
    setTagsList(tagsList.filter((c) => c !== tag));
  }

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

  useEffect(() => {
    if (props.edit) {
      setTagsList(props.tags);
    }
  }, [props.edit, props.tags]);

  return (
    <form
      className="flex flex-col max-w-[432px]"
      onSubmit={formik.handleSubmit}
    >
      <p className="mb-6 text-[40px]">{props.title}</p>

      <label htmlFor="description" className="text-xl mb-5">
        write a description to be visible on your public profile.
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

      <label htmlFor="handle" className="text-lg sm:mb-5">
        choose a handle
      </label>

      <p className="mb-5 text-sm break-words text-gray3 sm:hidden">
        app.cobogo.social/{formik.values.handle}
      </p>

      <div className="flex">
        <div className="px-4 h-12 bg-secondary hidden sm:flex justify-center items-center border border-r-0 border-gray10">
          <p className="font-bold">app.cobogo.social/</p>
        </div>

        <div className="relative w-full">
          {(formik.touched.handle && formik.errors.handle) || handleError ? (
            <ErrorLabel error={formik.errors.handle || handleError} />
          ) : null}

          <input
            id="handle"
            name="handle"
            type="text"
            onChange={formik.handleChange}
            onKeyPress={validateKeyPressedInHandle}
            value={formik.values.handle}
            className={`w-full h-12 bg-gray7 border sm:border-l-0 ${
              (formik.touched.handle && formik.errors.handle) || handleError
                ? 'border-red'
                : 'border-gray10'
            } mb-10 p-2 outline-none`}
          />
        </div>
      </div>

      <p className="mb-5 text-lg">choose up to 5 tags</p>

      <TagsInput input={tagInput} changeTags={changeTags} tags={tagsList} />

      <Tags tags={tagsList} removeTag={removeTag} />

      <p className="mb-5 text-lg">choose a category</p>

      <Select
        values={props.categories}
        changeValue={changeCategory}
        valueName={props.categoryName}
        placeholder="select a category"
      />

      {props.edit && (
        <>
          <label className="mb-5 text-lg">website</label>

          <input
            id="website"
            name="website"
            type="text"
            onChange={formik.handleChange}
            onKeyPress={validateKeyPressed}
            value={formik.values.website}
            className="w-full h-12 bg-gray7 border border-gray10 mb-10 p-2 outline-none"
            placeholder="https://example.com/"
          />
        </>
      )}

      {props.edit && (
        <>
          <label className="text-lg">video</label>

          <p className="mb-5 text-sm break-words text-gray3">
            link one of your videos that best describes you or your work here
          </p>

          <input
            id="presentationVideo"
            name="presentationVideo"
            type="text"
            onChange={formik.handleChange}
            onKeyPress={validateKeyPressed}
            value={formik.values.presentationVideo}
            className="w-full h-12 bg-gray7 border border-gray10 mb-10 p-2 outline-none"
            placeholder="https://www.youtube.com/watch?v=<video_id>"
          />

          <p className="mb-5 text-lg">choose a language</p>

          <Select
            values={props.languages}
            changeValue={changeLanguage}
            valueName={props.languageName}
            placeholder="select a language"
          />
        </>
      )}

      {!props.edit ? (
        <div className="mb-12">
          <Button
            text={props.buttonText}
            color="bg-blue"
            onClick={request}
            onKeyDown={request}
          />
        </div>
      ) : (
        <div className="fixed bottom-0 right-0 w-[600px] h-16 bg-gradient-to-t from-black to-black[0] z-40 px-[70px] py-10 flex items-end">
          <Button
            text={props.buttonText}
            color="bg-blue"
            onClick={request}
            onKeyDown={request}
          />
        </div>
      )}
    </form>
  );
}
