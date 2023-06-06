import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';

import { type RootState } from '../../redux/store';
import {
  currentDraftAction,
  currentDraftLoading,
  loadDraft,
  loadPostAsDraft,
} from '../../redux/currentDraft/actions';
import ImageInput from '../ImageInput/ImageInput';
import defaultImage from '../../assets/defaultImage.png';
import PreLoader from '../PreLoader/PreLoader';
import { editorApiKey, imageStaticURL } from '../../configs/config';
import { uploadImage } from '../../services/uploadImage';
import FormControlButtons from '../FormControlButtons/FormControlButtons';
import tinyMceEditorConfig from '../../configs/tinyMceEditorConfig';
import GenreSelect from '../GenreSelect/GenreSelect';

import styles from './PostEditForm.module.css';

interface Props {
  isModeratorEdit?: boolean;
  _id?: string | null;
  type?: 'createDraft' | 'post' | 'editDraft';
}

function PostEditForm({ _id, type, isModeratorEdit }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updatingSuccess = useSelector(
    (state: RootState) => state.currentDraft?.updateStatus,
  );
  const isLoading = useSelector(
    (state: RootState) => state.currentDraft?.loading,
  );
  const draft = useSelector((state: RootState) => state.currentDraft?.draft);

  const isNotAuth = useSelector((state: RootState) => state.me) == null;
  const disabled = isNotAuth || isLoading;

  const [postTitle, setPostTitle] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [genre, setGenre] = useState<string | undefined>();

  const [imageSrc, setImageSrc] = useState<string | undefined>('');

  useEffect(() => {
    dispatch(currentDraftAction());
    if (!_id) {
      return;
    }
    dispatch(currentDraftLoading());
    if (type && type === 'post') {
      dispatch(loadPostAsDraft(_id));
      return;
    }
    dispatch(loadDraft(_id));
  }, [_id, dispatch, type]);

  useEffect(() => {
    if (draft != null) {
      setPostTitle(draft.postTitle);
      if (draft.value !== undefined) {
        const val = decodeURIComponent(escape(window.atob(draft.value)));
        setValue(val);
        setImageSrc(draft.image);
        setGenre(draft.genre);
      }
    } else {
      setPostTitle('');
      setValue('');
      setImageSrc('');
      setGenre('');
    }
  }, [draft]);

  useEffect(() => {
    if (updatingSuccess) {
      dispatch(currentDraftAction());
      navigate(-1);
    }
  }, [dispatch, navigate, updatingSuccess]);

  const inputChangeHandler = (e) => {
    setPostTitle(e.target.value);
  };

  const editorChangeHandler = (newText) => {
    setValue(newText);
  };

  const updateImageHandler = (imageString) => {
    setImageSrc(imageString);
  };

  const imageUploadHandler = async (blobInfo) => await uploadImage(blobInfo.blob()).then(
    (json) => `${imageStaticURL}/${json.filename}`,
  );

  const post = {
    _id,
    postTitle,
    value: btoa(unescape(encodeURIComponent(value))),
    genre,
    image: imageSrc,
  };

  return (
    <form className={styles.container}>
      <PreLoader loading={isLoading} />
      {!isLoading && (
        <>
          <label>
            <input
              className={styles.titleInput}
              value={postTitle}
              onChange={inputChangeHandler}
              placeholder="Заголовок статьи"
              disabled={disabled}
            />
          </label>
          <ImageInput
            className={styles.imgInput}
            isEdit={!isNotAuth}
            imageSrc={imageSrc}
            defaultImage={defaultImage}
            callbackUpdate={updateImageHandler}
          />
          <GenreSelect genre={genre} setGenre={setGenre} disabled={disabled} />
          <div className={styles.editor}>
            <Editor
              value={value}
              onEditorChange={editorChangeHandler}
              disabled={disabled}
              apiKey={editorApiKey}
              init={{
                ...tinyMceEditorConfig,
                toolbar_location: 'bottom',
                images_upload_handler: imageUploadHandler,
              }}
            />
          </div>
          <div className={styles.rowButton}>
            <FormControlButtons
              post={post}
              isModeratorEdit={isModeratorEdit}
              type={type}
              disabled={disabled}
            />
          </div>
        </>
      )}
    </form>
  );
}

export default PostEditForm;
