import PostEditForm from '../components/PostEditForm/PostEditForm';
import LimitedContainer from '../components/LimitedContainer/LimitedContainer';

import styles from './Pages.module.css';

function NewPostPage() {
  return (
    <LimitedContainer className={styles.postEditContainer}>
      <h1>Расскажите свою историю.</h1>
      <PostEditForm type="createDraft" isModeratorEdit={false} />
    </LimitedContainer>
  );
}

export default NewPostPage;
