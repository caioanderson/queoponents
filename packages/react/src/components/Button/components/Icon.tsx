import { type HTMLAttributes, type ReactNode } from 'react';
import { Icon } from '../../Icon';
import { iconStyle } from '../styles/style.css.ts';
import { useButtonContext } from '../context';
import type { FaClassName } from '../../../types/fontawesome';

export interface ButtonIconProps extends Omit<HTMLAttributes<HTMLElement>, 'name'> {
  children?: ReactNode;
  name: FaClassName;
}

function ButtonIcon({ children, className, name, ...props }: ButtonIconProps) {
  const { size } = useButtonContext();
  return (
    <span className={`${iconStyle({ size })} ${className || ''}`.trim()} {...props}>
      {name ? <Icon name={name} /> : children}
    </span>
  );
}

export { ButtonIcon };
