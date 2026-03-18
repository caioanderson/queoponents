import type { HTMLAttributes } from "react";
import { textStyle } from "./styles/style.css";
import type { TextSize, TextTag } from "./types/text";

type TextProps = HTMLAttributes<HTMLElement> & {
  as?: TextTag;
  size?: TextSize;
};

function Text({ as: Component = "span", size = "paragraph", className, ...props }: TextProps) {
  return (
    <Component
      className={`${textStyle({ size })} ${className || ""}`.trim()}
      {...props}
    />
  );
}

Text.displayName = "Text";

export { Text };
export type { TextProps, TextSize, TextTag };
