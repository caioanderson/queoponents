import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { withTheme } from '@/provider/ThemeProvider.tsx';
import textInputStyles from '../styles/style.css.ts';
import { TextInputContext, type TextInputContextValue } from '../context';

export interface TextInputRootProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  disabled?: boolean;
  active?: boolean;
  children: ReactNode;
  defaultValue?: string | number | readonly string[];
  value?: string | number | readonly string[];
}

function TextInputRootComponent({
  id,
  disabled,
  active,
  children,
  className,
  defaultValue,
  value,
  ...props
}: TextInputRootProps) {
  const generatedId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value || !!defaultValue);
  const [hasLabel, setHasLabel] = useState(false);
  const [hasLeftSlot, setHasLeftSlot] = useState(false);
  const [hasStaticSlot, setHasStaticSlot] = useState(false);
  const [hasStaticLeftSlot, setHasStaticLeftSlot] = useState(false);
  const [hasStaticRightSlot, setHasStaticRightSlot] = useState(false);

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  useEffect(() => {
    if (active) {
      inputRef.current?.focus();
    } else if (active === false) {
      inputRef.current?.blur();
    }
  }, [active]);

  const isActive = active || isFocused || hasValue;

  const ctx = useMemo<TextInputContextValue>(
    () => ({
      id: id ?? generatedId,
      disabled,
      hasLabel,
      hasLeftSlot,
      hasStaticSlot,
      hasStaticLeftSlot,
      hasStaticRightSlot,
      isActive,
      setHasLabel,
      setHasLeftSlot,
      setHasStaticSlot,
      setHasStaticLeftSlot,
      setHasStaticRightSlot,
      setHasValue,
      setIsFocused,
      inputRef,
    }),
    [id, generatedId, disabled, hasLabel, hasLeftSlot, hasStaticSlot, hasStaticLeftSlot, hasStaticRightSlot, isActive]
  );

  return (
    <TextInputContext.Provider value={ctx}>
      <div
        className={`${textInputStyles({ disabled })} ${className || ''}`.trim()}
        onClick={() => inputRef.current?.focus()}
        {...props}
      >
        {children}
      </div>
    </TextInputContext.Provider>
  );
}

const TextInputRoot = withTheme(TextInputRootComponent);
TextInputRoot.displayName = 'TextInput.Root';

export { TextInputRoot, TextInputRootComponent };
