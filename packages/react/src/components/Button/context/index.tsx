import { createContext, useContext } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'transparent';
type ButtonSize = 'medium' | 'small' | 'tiny';

type ButtonContextValue = {
  variant: ButtonVariant;
  size: ButtonSize;
  disabled?: boolean;
};

const ButtonContext = createContext<ButtonContextValue | null>(null);

function useButtonContext() {
  const ctx = useContext(ButtonContext);
  if (!ctx) throw new Error('Button.* must be used inside Button.Root');
  return ctx;
}

export { ButtonContext, useButtonContext };
export type { ButtonContextValue, ButtonSize, ButtonVariant };
