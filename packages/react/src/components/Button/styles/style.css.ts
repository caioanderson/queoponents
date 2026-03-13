import { style } from "@vanilla-extract/css";
import { theme } from "@/styles/index.css.ts";
import { recipe } from "@vanilla-extract/recipes";

const baseButtonStyle = style({
  padding: "12px 18px",
  border: "none",
  width: "100%",
  borderRadius: 12,
  cursor: "pointer",
  transition: "all 0.3s ease",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Inter, sans-serif",
  fontWeight: 500,
  fontSize: 15,
  lineHeight: "18px",
  gap: 8,
  ":hover": {
    filter: "brightness(0.95)",
  },
  ":active": {
    transform: "scale(0.98)",
  },
});

const buttonStyle = recipe({
  base: baseButtonStyle,
  variants: {
    variant: {
      primary: {
        backgroundColor: theme.colors.palette.systemBlueBase,
        color: theme.colors.text.textPrimary,
        boxShadow:
          "0px 4px 6px -2px rgba(0, 0, 0, 0.02), 0px 10px 15px -3px rgba(0, 0, 0, 0.04)",
      },
      secondary: {
        backgroundColor: theme.colors.palette.systemGrayLighter,
        color: theme.colors.palette.systemBlueBase,
        boxShadow:
          "0px 4px 6px -2px rgba(0, 0, 0, 0.02), 0px 10px 15px -3px rgba(0, 0, 0, 0.04)",
      },
      ghost: {
        backgroundColor: "transparent",
        color: theme.colors.palette.systemGrayDarker,
        ":hover": {
          backgroundColor: theme.colors.palette.systemGrayLighter,
        },
      },
      transparent: {
        backgroundColor: "transparent",
        color: theme.colors.text.textNegative,
      },
    },
    size: {
      medium: {
        height: 50,
      },
      small: {
        height: 44,
        padding: "8px 16px",
        fontSize: 13,
        lineHeight: "16px",
      },
      tiny: {
        height: 32,
        padding: "6px 12px",
        fontSize: 13,
        lineHeight: "16px",
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
        cursor: "not-allowed",
        ":hover": {
          filter: "none",
        },
        ":active": {
          transform: "none",
        },
      },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
    disabled: false,
  },
});

export const iconStyle = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  variants: {
    size: {
      medium: { fontSize: 18 },
      small: { fontSize: 16 },
      tiny: { fontSize: 14 },
    },
  },
});

export const textStyle = recipe({
  base: {},
  variants: {
    size: {
      medium: { fontSize: 15 },
      small: { fontSize: 13 },
      tiny: { fontSize: 12 },
    },
  },
});

export default buttonStyle;
