import type { HTMLAttributes } from 'react';
import { withTheme } from '../../provider/ThemeProvider';
import type { FaClassName } from '../../types/fontawesome';

export interface IconProps extends Omit<HTMLAttributes<HTMLElement>, 'name'> {
  name: FaClassName;
}

function IconComponent({ name, className, ...props }: IconProps) {
  return <i className={`${name} ${className || ''}`.trim()} {...props} />;
}

export const Icon = withTheme(IconComponent);

Icon.displayName = 'Icon';
