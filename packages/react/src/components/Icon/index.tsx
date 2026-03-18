import type { HTMLAttributes } from 'react';
import { withTheme } from '../../provider/ThemeProvider';
import type { FaClassName } from '../../types/fontawesome';
import { colors, textStyles } from '@queoponents/tokens';

export interface IconProps extends Omit<HTMLAttributes<HTMLElement>, 'name'> {
  name: FaClassName;
  color?: string;
  size?: number | string;
  stroke?: string;
}

function IconComponent({ name, className, color, size, stroke, style, ...props }: IconProps) {
  return (
    <i
      className={`${name} ${className || ''}`.trim()}
      style={{
        ...style,
        color: color ?? colors.theme.state.disabled,
        fontSize: size ?? textStyles.paragraphRegular.fontSize,
        fontWeight: stroke ?? textStyles.paragraphEmphasis.fontWeight
      }}
      {...props}
    />
  );
}

export const Icon = withTheme(IconComponent);

Icon.displayName = 'Icon';
