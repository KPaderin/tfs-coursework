import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import commentsImg from '../../assets/comments.svg';

import styles from './CommentsCounter.module.css';

interface Props {
  className?: string;
  comments: string | number;
  path?: string;
}

function CommentsCounter({ className, comments, path }: Props) {
  return (
    <NavLink className={cn(styles.commentsLink, className)} to={path || '/'}>
      <span>
        <img src={commentsImg} alt="comments" />
        {comments}
      </span>
    </NavLink>
  );
}

export default CommentsCounter;
