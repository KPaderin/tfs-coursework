import cn from 'classnames';

import styles from './GenreItem.module.css';

interface Props {
  className?: string;
  genre?: string;
}

function GenreItem({ className, genre }: Props) {
  return <div className={cn(styles.genreLink, className)}>{genre}</div>;
}

export default GenreItem;
