import { type HTMLAttributes, type ReactNode } from 'react';
import { Icon } from '../../Icon';
import { iconStyle } from '../styles/style.css.ts';
import { useButtonContext } from '../context';
import type { FaClassName } from '../../../types/fontawesome';

export interface ButtonIconProps extends Omit<HTMLAttributes<HTMLElement>, 'name'> {
  children?: ReactNode;
  name: FaClassName;
  color?: string;
  size?: number | string;
  stroke?: string;
}

function ButtonIcon({ children, className, name, color, size, stroke, ...props }: ButtonIconProps) {
  const { size: buttonSize } = useButtonContext();
  const effectiveSize =
    size ??
    (buttonSize === 'medium' ? 18 : buttonSize === 'small' ? 16 : 14);
  return (
    <span className={`${iconStyle({ size: buttonSize })} ${className || ''}`.trim()} {...props}>
      {name ? <Icon name={name} color={color} size={effectiveSize} stroke={stroke} /> : children}
    </span>
  );
}

export { ButtonIcon };
