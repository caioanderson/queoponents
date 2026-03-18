import { recipe } from "@vanilla-extract/recipes";
import { theme } from "@/styles/index.css.ts";

const sizeLineHeightMap = {
  tiny: theme.text.lineHeight.small,
  small: theme.text.lineHeight.normal,
  label: theme.text.lineHeight.medium,
  paragraph: theme.text.lineHeight.large,
  headline: theme.text.lineHeight.large,
  subtitle: theme.text.lineHeight.xLarge,
  header: theme.text.lineHeight.xxLarge,
  medium: theme.text.lineHeight.xxLarge,
  large: theme.text.lineHeight.xxxLarge,
} as const;

export const textStyle = recipe({
  base: {
    fontFamily: theme.text.fonts.inter,
    color: "inherit",
    margin: 0,
  },
  variants: {
    size: {
      tiny: {
        fontSize: theme.text.sizes.tiny,
        lineHeight: sizeLineHeightMap.tiny,
      },
      small: {
        fontSize: theme.text.sizes.small,
        lineHeight: sizeLineHeightMap.small,
      },
      label: {
        fontSize: theme.text.sizes.label,
        lineHeight: sizeLineHeightMap.label,
      },
      paragraph: {
        fontSize: theme.text.sizes.paragraph,
        lineHeight: sizeLineHeightMap.paragraph,
      },
      headline: {
        fontSize: theme.text.sizes.headline,
        lineHeight: sizeLineHeightMap.headline,
      },
      subtitle: {
        fontSize: theme.text.sizes.subtitle,
        lineHeight: sizeLineHeightMap.subtitle,
      },
      header: {
        fontSize: theme.text.sizes.header,
        lineHeight: sizeLineHeightMap.header,
      },
      medium: {
        fontSize: theme.text.sizes.medium,
        lineHeight: sizeLineHeightMap.medium,
      },
      large: {
        fontSize: theme.text.sizes.large,
        lineHeight: sizeLineHeightMap.large,
      },
    },
  },
  defaultVariants: {
    size: "paragraph",
  },
});
