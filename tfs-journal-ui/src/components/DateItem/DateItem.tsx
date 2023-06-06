import cn from 'classnames';

import styles from './DateItem.module.css';

interface Props {
  dateNumber: string;
  className?: string;
}

function DateItem({ dateNumber, className }: Props) {
  const date = new Date(Number(dateNumber)).toLocaleDateString('ru-RU');
  return <time className={cn(styles.date, className)}>{date}</time>;
}

export default DateItem;
