import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import BoardItem from '../BoardItem/BoardItem';
import { type Post } from '../../types/types';
import ViewsCounter from '../ViewsCounter/ViewsCounter';
import GenreItem from '../GenreItem/GenreItem';
import CommentsCounter from '../CommentsCounter/CommentsCounter';
import DateItem from '../DateItem/DateItem';
import LikeButton from '../LikeButton/LikeButton';
import { setLike, setLikeAction } from '../../redux/posts/actions';
import { type RootState } from '../../redux/store';

import styles from './BoardPost.module.css';

interface Props {
  post: Post;
}

function BoardPost({ post }: Props) {
  const dispatch = useDispatch();

  const notAuth = useSelector((state: RootState) => state.me) == null;

  const isImageVisible = post?.image && post.image !== 'undefined';

  const likeHandler = () => {
    if (!post._id) {
      return;
    }
    dispatch(setLikeAction(post._id));
    dispatch(setLike(post._id));
  };
  return (
    <BoardItem className={styles.container}>
      <div className={styles.info}>
        <DateItem className={styles.date} dateNumber={post.date} />
        <ViewsCounter className={styles.viewers} viewers={post.viewers} />
        <GenreItem className={styles.genreItem} genre={post.genre} />
      </div>
      <NavLink className={styles.postLink} to={post._id}>
        <h3 className={styles.title}>{post.postTitle}</h3>
      </NavLink>
      {isImageVisible && (
        <img className={styles.postImage} src={post.image} alt="post" />
      )}
      <div className={styles.footer}>
        <LikeButton
          isLiked={post.isLiked}
          disabled={notAuth}
          handler={likeHandler}
          likes={post.likes}
        />
        <CommentsCounter
          className={styles.commentsLink}
          path={post._id}
          comments={post.comments.length}
        />
      </div>
    </BoardItem>
  );
}

export default BoardPost;
