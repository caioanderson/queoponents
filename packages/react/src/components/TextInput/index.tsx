import { TextInputRoot } from './components/Root';
import { TextInputLabel } from './components/Label';
import { TextInputControl } from './components/Control';
import { TextInputInput } from './components/Input';
import { TextInputSlot } from './components/Slot';

export const TextInput = Object.assign(TextInputRoot, {
  Root: TextInputRoot,
  Label: TextInputLabel,
  Control: TextInputControl,
  Input: TextInputInput,
  Slot: TextInputSlot,
});

export {
  TextInputRoot,
  TextInputLabel,
  TextInputControl,
  TextInputInput,
  TextInputSlot
};

export type { TextInputRootProps } from './components/Root';
export type { TextInputLabelProps } from './components/Label';
export type { TextInputControlProps } from './components/Control';
export type { TextInputInputProps } from './components/Input';
export type { TextInputSlotProps } from './components/Slot';

TextInput.displayName = 'TextInput';
