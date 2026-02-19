import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from 'react';
import { withTheme } from '../../provider/ThemeProvider';
import buttonStyles from './style.css.ts';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ComponentProps<typeof buttonStyles> & {
    children: ReactNode
  }

function ButtonComponent({
  variant,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${buttonStyles({ variant, disabled })} ${className || ''}`.trim()}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export const Button = withTheme(ButtonComponent);

Button.displayName = 'Button'