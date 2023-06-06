import { useState } from 'react';
import { Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import {
  postComment,
  sendingCommentAction,
} from '../../redux/currentPost/actions';
import { isValidComment } from '../../helpers/isValidComment';
import { type RootState } from '../../redux/store';

import styles from './CommentForm.module.css';

const { TextArea } = Input;

interface Props {
  postId?: string;
  disabled?: boolean;
}

function CommentForm({ postId, disabled }: Props) {
  const dispatch = useDispatch();

  const [text, setText] = useState<string>('');
  const loading = useSelector(
    (state: RootState) => state.currentPost?.sendingComment,
  );

  const inputHandler = (e) => {
    setText(e.target.value);
  };

  const sendHandler = () => {
    if (!isValidComment(text)) {
      return;
    }
    dispatch(sendingCommentAction());
    dispatch(postComment(postId, text));
    setText('');
  };
  return (
    <>
      <TextArea
        className={styles.inputComment}
        showCount
        maxLength={150}
        onChange={inputHandler}
        value={text}
        placeholder="Ваш ответ"
        disabled={loading || disabled}
      />
      <Button
        className={styles.sendButton}
        loading={loading}
        disabled={loading || disabled}
        onClick={sendHandler}
      >
        Отправить
      </Button>
    </>
  );
}

export default CommentForm;
