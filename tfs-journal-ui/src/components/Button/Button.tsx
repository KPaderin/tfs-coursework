import type React from 'react';
import cn from 'classnames';

import styles from './Button.module.css';

interface Props {
  children?: React.ReactNode;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  disabled?: boolean;
}

function Button({
  children, type, onClick, className, disabled,
}: Props) {
  return (
    <button
      className={cn(styles.button, className)}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
