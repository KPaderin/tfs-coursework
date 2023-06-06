import { type ReactNode } from 'react';
import cn from 'classnames';

import styles from './BoardItem.module.css';

interface Props {
  className?: string;
  children?: ReactNode;
}

function BoardItem({ className, children }: Props) {
  return <div className={cn(styles.container, className)}>{children}</div>;
}

export default BoardItem;
