import { type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import BoardItem from '../BoardItem/BoardItem';

import styles from './BoardPostPreview.module.css';

interface Props {
  post: {
    _id: string;
    postTitle: string;
  };
  children?: ReactNode;
}

function BoardPostPreview({ post, children }: Props) {
  return (
    <BoardItem className={styles.container}>
      <NavLink className={styles.postLink} to={`/feed/${post._id}`}>
        <h3 className={styles.title}>{post.postTitle}</h3>
      </NavLink>
      {children}
    </BoardItem>
  );
}

export default BoardPostPreview;
