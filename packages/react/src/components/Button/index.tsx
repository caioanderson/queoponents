import { ButtonIcon, type ButtonIconProps } from './components/Icon';
import { ButtonRoot, type ButtonRootProps } from './components/Root';
import { ButtonText, type ButtonTextProps } from './components/Text';

export const Button = Object.assign(ButtonRoot, {
  Root: ButtonRoot,
  Icon: ButtonIcon,
  Text: ButtonText,
});

export type { ButtonIconProps, ButtonRootProps, ButtonTextProps };

Button.displayName = 'Button';
