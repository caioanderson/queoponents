import type { text } from "@queoponents/tokens";

export type TextTag =
  | "p"
  | "span"
  | "label"
  | "small"
  | "strong"
  | "em"
  | "b"
  | "i"
  | "u"
  | "s"
  | "mark"
  | "code"
  | "pre"
  | "blockquote"
  | "cite"
  | "q"
  | "abbr"
  | "kbd"
  | "sup"
  | "sub"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

export type TextSize = keyof typeof text.sizes;
