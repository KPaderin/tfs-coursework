import { type ReactNode } from 'react';
import cn from 'classnames';

import styles from './LimitedContainer.module.css';

interface Props {
  className?: string;
  children?: ReactNode;
}

function LimitedContainer({ className, children }: Props) {
  return (
    <div className={cn(styles.container, className)}>
      <div className={styles.limitedContainer}>{children}</div>
    </div>
  );
}

export default LimitedContainer;
