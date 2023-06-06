import cn from 'classnames';

import viewersImg from '../../assets/view.svg';

import styles from './ViewsCounter.module.css';

interface Props {
  className?: string;
  viewers: string | number;
}

function ViewsCounter({ className, viewers }: Props) {
  return (
    <span className={cn(styles.container, className)}>
      <img className={styles.viewersImg} src={viewersImg} alt="viewers" />
      {viewers}
    </span>
  );
}

export default ViewsCounter;
