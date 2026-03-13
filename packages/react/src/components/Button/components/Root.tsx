import { useMemo, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { withTheme } from '@/provider/ThemeProvider.tsx';
import buttonStyles from '../styles/style.css.ts';
import { ButtonContext, type ButtonSize, type ButtonVariant } from '../context';

export interface ButtonRootProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

function ButtonRootComponent({
  variant = 'primary',
  size = 'medium',
  className,
  children,
  disabled,
  ...props
}: ButtonRootProps) {
  const ctx = useMemo(
    () => ({ variant, size, disabled }),
    [variant, size, disabled]
  );

  return (
    <ButtonContext.Provider value={ctx}>
      <button
        className={`${buttonStyles({ variant, size, disabled })} ${className || ''}`.trim()}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    </ButtonContext.Provider>
  );
}

const ButtonRoot = withTheme(ButtonRootComponent);

export { ButtonRoot, ButtonRootComponent };
