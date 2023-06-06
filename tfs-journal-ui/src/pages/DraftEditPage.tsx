import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PostEditForm from '../components/PostEditForm/PostEditForm';
import LimitedContainer from '../components/LimitedContainer/LimitedContainer';
import { type RootState } from '../redux/store';

import styles from './Pages.module.css';

interface Props {
  type?: 'createDraft' | 'post' | 'editDraft';
}

function DraftEditPage({ type }: Props) {
  const { postId } = useParams();
  const me = useSelector((state: RootState) => state.me);

  const isModeratorEdit = me?.role?.includes('admin');

  return (
    <LimitedContainer className={styles.postEditContainer}>
      {isModeratorEdit || (type && type === 'editDraft') ? (
        <>
          <h1>Расскажите свою историю.</h1>
          <PostEditForm
            isModeratorEdit={isModeratorEdit}
            _id={postId}
            type={type}
          />
        </>
      ) : (
        <h3>Нужно быть модератором</h3>
      )}
    </LimitedContainer>
  );
}

export default DraftEditPage;
