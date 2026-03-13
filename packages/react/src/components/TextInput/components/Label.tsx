import { useEffect, type HTMLAttributes } from 'react';
import { labelStyle } from '../styles/style.css.ts';
import { useTextInputContext } from '../context';

export interface TextInputLabelProps extends HTMLAttributes<HTMLLabelElement> { }

function TextInputLabel({ children, className, ...props }: TextInputLabelProps) {
  const { id, isActive, setHasLabel, hasLeftSlot } = useTextInputContext();

  useEffect(() => {
    setHasLabel(true);
    return () => setHasLabel(false);
  }, [setHasLabel]);

  return (
    <label
      htmlFor={id}
      className={`${labelStyle({ active: isActive, hasLeftSlot })} ${className || ''}`.trim()}
      {...props}
    >
      {children}
    </label>
  );
}

export { TextInputLabel };
