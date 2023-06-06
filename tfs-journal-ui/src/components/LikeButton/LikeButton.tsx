import cn from 'classnames';

import likeImg from '../../assets/like.svg';

import styles from './LikeButton.module.css';

interface Props {
  className?: string;
  isLiked?: boolean | 'loading';
  likes: number;
  handler: () => void;
  disabled?: boolean;
}

function LikeButton({
  className, isLiked, disabled, likes, handler,
}: Props) {
  return (
    <button
      className={cn(styles.likeButton, className)}
      data-liked={isLiked}
      disabled={disabled}
      onClick={handler}
    >
      <span>
        <img src={likeImg} alt="like button" />
        {likes}
      </span>
    </button>
  );
}

export default LikeButton;
