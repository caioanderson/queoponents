import { boxStyle } from "./styles/index.css";
import type { BoxProps } from "./types/box";
import { restStylesBox } from "./utils";

function toCssDimension(value?: number | string) {
  if (value === undefined || value === null) return undefined;
  if (typeof value === "number") return `${value}px`;
  const trimmed = value.trim();
  if (/^\d+(\.\d+)?$/.test(trimmed)) return `${trimmed}px`;
  return value;
}

function Box({
  children,
  className,
  style,
  ...props
}: BoxProps) {

  return (
    <div
      style={{
        ...props,
        width: toCssDimension(props.width),
        height: toCssDimension(props.height),
        minWidth: toCssDimension(props.minWidth),
        maxWidth: toCssDimension(props.maxWidth),
        minHeight: toCssDimension(props.minHeight),
        maxHeight: toCssDimension(props.maxHeight),
        ...restStylesBox(props),
        ...style,
      }}
      className={`${boxStyle()} ${className || ""}`.trim()}
    >
      {children}
    </div>
  );
}

Box.displayName = "Box";

export { Box };
export type { BoxProps };
