import { createContext, useContext, type RefObject } from 'react';

type TextInputContextValue = {
  id: string;
  disabled?: boolean;
  hasLabel: boolean;
  hasLeftSlot: boolean;
  hasStaticSlot: boolean;
  hasStaticLeftSlot: boolean;
  hasStaticRightSlot: boolean;
  isActive: boolean;
  setHasLabel: (v: boolean) => void;
  setHasLeftSlot: (v: boolean) => void;
  setHasStaticSlot: (v: boolean) => void;
  setHasStaticLeftSlot: (v: boolean) => void;
  setHasStaticRightSlot: (v: boolean) => void;
  setHasValue: (v: boolean) => void;
  setIsFocused: (v: boolean) => void;
  inputRef: RefObject<HTMLInputElement | null>;
};

const TextInputContext = createContext<TextInputContextValue | null>(null);

function useTextInputContext() {
  const ctx = useContext(TextInputContext);
  if (!ctx) throw new Error('TextInput.* must be used inside TextInput.Root');
  return ctx;
}

export { TextInputContext, useTextInputContext };
export type { TextInputContextValue };
