import { type HTMLAttributes } from 'react';
import { textStyle } from '../styles/style.css.ts';
import { useButtonContext } from '../context';

export interface ButtonTextProps extends HTMLAttributes<HTMLSpanElement> {
  value: string;
}

function ButtonText({ value, className, ...props }: ButtonTextProps) {
  const { size } = useButtonContext();
  return (
    <span className={`${textStyle({ size })} ${className || ''}`.trim()} {...props}>
      {value}
    </span>
  );
}

export { ButtonText };
