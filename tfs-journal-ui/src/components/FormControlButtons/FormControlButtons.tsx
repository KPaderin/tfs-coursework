import { useDispatch, useSelector } from 'react-redux';

import Button from '../Button/Button';
import { isValidPostForm } from '../../helpers/isValidPostForm';
import {
  currentDraftLoading,
  deleteCurrentDraft,
  publishDraft,
  saveDraft,
  saveEditedPost,
} from '../../redux/currentDraft/actions';
import { type RootState } from '../../redux/store';

import styles from '../PostEditForm/PostEditForm.module.css';

interface Props {
  post: any;
  disabled?: boolean;
  type?: 'createDraft' | 'post' | 'editDraft';
  isModeratorEdit?: boolean;
}

function FormControlButtons({
  isModeratorEdit, post, type, disabled,
}: Props) {
  const dispatch = useDispatch();

  const meId = useSelector((state: RootState) => state.me?._id);
  const authorId = useSelector(
    (state: RootState) => state.currentDraft?.draft?.author?._id,
  );

  const {
    postTitle, value, imageSrc, genre, _id,
  } = post;

  const submitHandler = (e) => {
    e.preventDefault();
    if (isValidPostForm(postTitle, value, genre, imageSrc)) {
      dispatch(currentDraftLoading());
      dispatch(publishDraft(post));
    } else {
      alert('не все поля заполнены');
    }
  };

  const updatePostHandler = (e) => {
    e.preventDefault();
    if (isValidPostForm(postTitle, value, genre, imageSrc)) {
      dispatch(currentDraftLoading());
      dispatch(saveEditedPost(post));
    } else {
      alert('не все поля заполнены');
    }
  };

  const moderateHandler = (e) => {
    e.preventDefault();
    if (isValidPostForm(postTitle, value, genre, imageSrc)) {
      dispatch(currentDraftLoading());
      dispatch(saveDraft({ ...post, isModerateRequested: true }));
    } else {
      alert('не все поля заполнены');
    }
  };

  const editLaterHandler = (e) => {
    e.preventDefault();
    if (isValidPostForm(postTitle, value, genre, imageSrc)) {
      dispatch(currentDraftLoading());
      dispatch(saveDraft(post));
    } else {
      alert('не все поля заполнены');
    }
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    dispatch(currentDraftLoading());
    dispatch(deleteCurrentDraft(_id));
  };
  return (
    <>
      {isModeratorEdit && type && type === 'editDraft' && (
        <Button
          className={styles.sendButton}
          onClick={submitHandler}
          disabled={disabled}
        >
          Опубликовать
        </Button>
      )}
      {isModeratorEdit && type && type === 'post' && (
        <Button
          className={styles.sendButton}
          onClick={updatePostHandler}
          disabled={disabled}
        >
          Сохранить изменения
        </Button>
      )}
      {type
        && (type === 'createDraft'
          || (type === 'editDraft' && meId === authorId)) && (
          <>
            <Button
              className={styles.sendButton}
              onClick={moderateHandler}
              disabled={disabled}
            >
              Отправить на модерацию
            </Button>
            <Button
              className={styles.sendButton}
              onClick={editLaterHandler}
              disabled={disabled}
            >
              Сохранить в черновиках
            </Button>
          </>
      )}
      {type && type === 'editDraft' && meId === authorId && (
        <Button
          className={styles.sendButton}
          onClick={deleteHandler}
          disabled={disabled}
        >
          Удалить черновик
        </Button>
      )}
    </>
  );
}

export default FormControlButtons;
