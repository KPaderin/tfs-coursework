import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import GenreItem from '../GenreItem/GenreItem';
import CommentsCounter from '../CommentsCounter/CommentsCounter';
import ViewsCounter from '../ViewsCounter/ViewsCounter';
import DateItem from '../DateItem/DateItem';
import { setLike, setLikeAction } from '../../redux/currentPost/actions';
import { type RootState } from '../../redux/store';
import defaultAvatar from '../../assets/defaultAvatar.png';
import LikeButton from '../LikeButton/LikeButton';

import styles from './Post.module.css';

interface Props {
  disabled?: boolean;
}

function Post({ disabled }: Props) {
  const dispatch = useDispatch();

  const post = useSelector((state: RootState) => state?.currentPost);
  const me = useSelector((state: RootState) => state.me);

  const likeHandler = () => {
    if (post == null || !post._id) {
      return;
    }
    dispatch(setLikeAction());
    dispatch(setLike(post._id));
  };

  const isModeratorEdit = me?.role?.includes('admin');

  const userLink = `/${post?.author?._id}`;

  const postImage = post?.image && post.image !== 'undefined' && post.image;

  const postVal = post?.value && (
    <div
      className={styles.postContainer}
      dangerouslySetInnerHTML={{
        __html: decodeURIComponent(escape(window.atob(post.value))),
      }}
    />
  );
  return (
    <>
      {post != null && (
        <>
          <div className={styles.header}>
            <GenreItem className={styles.genre} genre={post.genre} />
            <DateItem className={styles.date} dateNumber={post.date} />
            <ViewsCounter className={styles.viewers} viewers={post.viewers} />
            {post.comments && (
              <CommentsCounter
                className={styles.comments}
                comments={post.comments.length}
              />
            )}
            {isModeratorEdit && (
              <NavLink to="edit" className={styles.editLink}>
                Редактировать
              </NavLink>
            )}
          </div>
          <h1 className={styles.title}>{post.postTitle}</h1>
          {postImage && (
            <img className={styles.postImage} src={postImage} alt="post" />
          )}
          <NavLink to={userLink} className={styles.userBlock}>
            <img
              className={styles.userImage}
              alt="Картинка автора"
              src={post.author?.image || defaultAvatar}
            />
            <h3 className={styles.userName}>{post.author?.name}</h3>
          </NavLink>
          {postVal}
          <LikeButton
            className={styles.likeButton}
            likes={post.likes}
            disabled={disabled}
            handler={likeHandler}
            isLiked={post.isLiked}
          />
        </>
      )}
    </>
  );
}

export default Post;
