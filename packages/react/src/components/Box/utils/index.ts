import type { BoxProps, SpacingValueBox } from "../types/box";

export const restStylesBox = (style: BoxProps) => {
  const border = style.b ?? style.border;
  const borderWidth = style.bw ?? style.borderWidth;
  const borderStyle = style.bs ?? style.borderStyle;
  const borderColor = style.bc ?? style.borderColor;
  const borderRadius = style.br ?? style.borderRadius;

  const props = {
    border,
    borderWidth: toCssValue(borderWidth as SpacingValueBox),
    borderStyle,
    borderColor,
    borderRadius: toCssValue(borderRadius as SpacingValueBox),
    inset: toCssValue(style.inset),
    top: toCssValue(style.top),
    right: toCssValue(style.right),
    bottom: toCssValue(style.bottom),
    left: toCssValue(style.left),
    padding: toCssValue(style.p),
    paddingInline: toCssValue(style.px),
    paddingBlock: toCssValue(style.py),
    paddingTop: toCssValue(style.pt),
    paddingRight: toCssValue(style.pr),
    paddingBottom: toCssValue(style.pb),
    paddingLeft: toCssValue(style.pl),
    margin: toCssValue(style.m),
    marginInline: toCssValue(style.mx),
    marginBlock: toCssValue(style.my),
    marginTop: toCssValue(style.mt),
    marginRight: toCssValue(style.mr),
    marginBottom: toCssValue(style.mb),
    marginLeft: toCssValue(style.ml),
  };
  return Object.fromEntries(
    Object.entries(props).filter(([_, value]) => value !== undefined),
  );
};

function toCssValue(value?: SpacingValueBox) {
  if (value === undefined || value === null) return undefined;
  if (typeof value === "number") return `${value}px`;
  const trimmed = value.trim();
  if (/^\d+(\.\d+)?$/.test(trimmed)) return `${trimmed}px`;
  return value;
}
