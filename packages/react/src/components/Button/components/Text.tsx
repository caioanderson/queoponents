import { type HTMLAttributes, type ReactNode } from 'react';
import { textStyle } from '../styles/style.css.ts';
import { useButtonContext } from '../context';

export interface ButtonTextProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

function ButtonText({ children, className, ...props }: ButtonTextProps) {
  const { size } = useButtonContext();
  return (
    <span className={`${textStyle({ size })} ${className || ''}`.trim()} {...props}>
      {children}
    </span>
  );
}

export { ButtonText };
