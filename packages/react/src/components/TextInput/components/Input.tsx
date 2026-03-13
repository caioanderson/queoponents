import { type ChangeEvent, type FocusEvent, type InputHTMLAttributes } from 'react';
import { inputStyle } from '../styles/style.css.ts';
import { useTextInputContext } from '../context';

export interface TextInputInputProps extends InputHTMLAttributes<HTMLInputElement> { }

function TextInputInput({
  onFocus,
  onBlur,
  onChange,
  className,
  ...props
}: TextInputInputProps) {
  const {
    id,
    disabled,
    hasLabel,
    isActive,
    hasStaticLeftSlot,
    hasStaticRightSlot,
    setIsFocused,
    setHasValue,
    inputRef,
  } =
    useTextInputContext();

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHasValue(!!e.target.value);
    onChange?.(e);
  };

  return (
    <input
      ref={inputRef}
      id={id}
      disabled={disabled}
      className={`${inputStyle({
        hasLabel,
        disabled,
        hasStaticLeftSlot,
        hasStaticRightSlot,
        isActive,
      })} ${className || ''}`.trim()}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
      {...props}
    />
  );
}

export { TextInputInput };
