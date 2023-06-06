import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import BoardPost from '../BoardPost/BoardPost';
import BoardItem from '../BoardItem/BoardItem';
import accountImageLight from '../../assets/accountLight.svg';
import { type RootState } from '../../redux/store';
import { loadPosts, loadPostsAction } from '../../redux/posts/actions';
import PreLoader from '../PreLoader/PreLoader';

import styles from './PostsBoard.module.css';

interface Props {
  currentPage: number;
}

function PostsBoard({ currentPage }: Props) {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts);
  const userImage = useSelector((state: RootState) => state.me?.image);

  useEffect(() => {
    dispatch(loadPostsAction());
    dispatch(loadPosts(currentPage));
  }, [currentPage, dispatch]);

  const loading = posts === null;

  return (
    <div className={styles.container}>
      <h1>Сообщество</h1>
      <p className="description--fDJlw">
        Здесь публикуются все тексты наших читателей, которые прошли модерацию.
        {' '}
        <br />
        Сюда может написать любой.
      </p>
      <BoardItem className={styles.postForm}>
        <img
          className={styles.accountImage}
          alt="account"
          src={userImage || accountImageLight}
        />
        <NavLink className={styles.newPost} to="/newPost">
          Написать свой текст...
        </NavLink>
      </BoardItem>
      <PreLoader loading={loading} />
      {posts?.map((item) => (
        <BoardPost key={item._id} post={item} />
      ))}
    </div>
  );
}

export default PostsBoard;
