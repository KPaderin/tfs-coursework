import { NavLink } from 'react-router-dom';

import DateItem from '../DateItem/DateItem';
import defaultUserAvatar from '../../assets/defaultAvatar.png';
import { type CommentType } from '../../types/types';

import styles from './Comment.module.css';

interface Props {
  comment: CommentType;
}

function Comment({ comment }: Props) {
  return (
    <div className={styles.container}>
      <img
        className={styles.avatar}
        alt="аватарка"
        src={comment.author.image || defaultUserAvatar}
      />
      <div className={styles.comment}>
        <div className={styles.row}>
          <NavLink to={`/${comment.author._id}`} className={styles.userName}>
            {comment.author.name}
          </NavLink>
          <DateItem className={styles.date} dateNumber={comment.date} />
        </div>
        {comment.value}
      </div>
    </div>
  );
}

export default Comment;
