import { useEffect, useLayoutEffect, useRef, useState, type HTMLAttributes } from 'react';
import { slotStyle } from '../styles/style.css.ts';
import { useTextInputContext } from '../context';

export interface TextInputSlotProps extends HTMLAttributes<HTMLSpanElement> {
  animated?: boolean;
}

function TextInputSlot({ className, animated = true, ...props }: TextInputSlotProps) {
  const {
    inputRef,
    setHasLeftSlot,
    setHasStaticSlot,
    setHasStaticLeftSlot,
    setHasStaticRightSlot,
    isActive,
    hasLabel,
  } = useTextInputContext();
  const slotRef = useRef<HTMLSpanElement>(null);
  const [side, setSide] = useState<'left' | 'right'>('left');
  const [isFloating, setIsFloating] = useState(false);

  useLayoutEffect(() => {
    const input = inputRef.current;
    const slot = slotRef.current;
    if (!input || !slot) return;

    const relation = input.compareDocumentPosition(slot);
    const isBefore = Boolean(relation & Node.DOCUMENT_POSITION_PRECEDING);
    const nextSide = isBefore ? 'left' : 'right';
    setSide(nextSide);

    const parentIsControl = slot.parentElement?.dataset?.textinputControl === 'true';
    setIsFloating(!parentIsControl);
  }, [inputRef]);

  useEffect(() => {
    setHasLeftSlot(side === 'left');
    return () => setHasLeftSlot(false);
  }, [side, setHasLeftSlot]);

  useEffect(() => {
    if (!animated) {
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
    }
    if (isFloating) {
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
    }
    setHasStaticSlot(false);
    setHasStaticLeftSlot(false);
    setHasStaticRightSlot(false);
    return undefined;
  }, [animated, isFloating, side, setHasStaticSlot, setHasStaticLeftSlot, setHasStaticRightSlot]);

  return (
    <span
      ref={slotRef}
      data-side={side}
      data-static={!animated}
      data-floating={isFloating}
      data-animated={animated}
      data-active={isActive && hasLabel}
      className={`${slotStyle()} ${className || ''}`.trim()}
      {...props}
    />
  );
}

export { TextInputSlot };
