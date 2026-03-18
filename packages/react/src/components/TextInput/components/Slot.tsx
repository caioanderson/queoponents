import { useEffect, useLayoutEffect, useRef, useState, type HTMLAttributes } from 'react';
import { slotStyle } from '../styles/style.css.ts';
import { useTextInputContext } from '../context';

export interface TextInputSlotProps extends HTMLAttributes<HTMLSpanElement> {
}

function TextInputSlot({ className, style, ...props }: TextInputSlotProps) {
  const {
    inputRef,
    setHasLeftSlot,
    setHasStaticSlot,
    setHasStaticLeftSlot,
    setHasStaticRightSlot,
  } = useTextInputContext();
  const slotRef = useRef<HTMLSpanElement>(null);
  const [side, setSide] = useState<'left' | 'right'>('left');

  useLayoutEffect(() => {
    const input = inputRef.current;
    const slot = slotRef.current;
    if (!input || !slot) return;

    const relation = input.compareDocumentPosition(slot);
    const isBefore = Boolean(relation & Node.DOCUMENT_POSITION_PRECEDING);
    const nextSide = isBefore ? 'left' : 'right';
    setSide(nextSide);

  }, [inputRef]);

  useEffect(() => {
    setHasLeftSlot(side === 'left');
    return () => setHasLeftSlot(false);
  }, [side, setHasLeftSlot]);

  useEffect(() => {
    setHasStaticSlot(true);
    if (side === 'left') {
      setHasStaticLeftSlot(true);
    } else {
      setHasStaticRightSlot(true);
    }
    return () => {
      setHasStaticSlot(false);
      if (side === 'left') {
        setHasStaticLeftSlot(false);
      } else {
        setHasStaticRightSlot(false);
      }
    };
  }, [side, setHasStaticSlot, setHasStaticLeftSlot, setHasStaticRightSlot]);

  return (
    <span
      ref={slotRef}
      className={`${slotStyle()} ${className || ''}`.trim()}
      style={{
        ...style,
        left: side === 'left' ? 18 : undefined,
        right: side === 'right' ? 18 : undefined,
      }}
      {...props}
    />
  );
}

export { TextInputSlot };
