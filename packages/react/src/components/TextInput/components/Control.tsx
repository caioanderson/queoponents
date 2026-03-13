import { type HTMLAttributes } from 'react';
import { controlStyle } from '../styles/style.css.ts';
import { useTextInputContext } from '../context';

export interface TextInputControlProps extends HTMLAttributes<HTMLDivElement> { }

function TextInputControl({ children, className, ...props }: TextInputControlProps) {
  const { hasLabel, isActive, hasStaticSlot, hasStaticLeftSlot, hasStaticRightSlot } = useTextInputContext();
  return (
    <div
      className={`${controlStyle({ hasLabel, active: isActive, animate: !hasStaticSlot, hasStaticLeftSlot, hasStaticRightSlot })} ${className || ''}`.trim()}
      data-textinput-control="true"
      {...props}
    >
      {children}
    </div>
  );
}

export { TextInputControl };
