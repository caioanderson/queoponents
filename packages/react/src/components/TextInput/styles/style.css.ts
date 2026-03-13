import { style } from "@vanilla-extract/css";
import { theme } from "@/styles/index.css.ts";
import { recipe } from "@vanilla-extract/recipes";

export const container = style({
  backgroundColor: "white",
  cursor: "pointer",
  borderRadius: 12,
  height: 64,
  display: "flex",
  flexDirection: "column",
  boxSizing: "border-box",
  width: "100%",
  padding: "0 18px",
  position: "relative",
  overflow: "hidden",
});

export const labelStyle = recipe({
  base: {
    fontFamily: "Roboto, sans-serif",
    fontWeight: 400,
    lineHeight: "16px",
    color: theme.colors.palette.systemGrayBase,
    position: "absolute",
    left: 18,
    transition: "all 0.2s ease-in-out",
    pointerEvents: "none",
  },
  variants: {
    active: {
      true: {
        top: 12,
        fontSize: 12,
      },
      false: {
        top: 24,
        fontSize: 16,
      },
    },
    hasLeftSlot: {
      true: {
        left: 18,
      },
      false: {
        left: 18,
      },
    },
  },
  defaultVariants: {
    active: false,
    hasLeftSlot: false,
  },
});

export const inputStyle = recipe({
  base: {
    fontFamily: "Roboto, sans-serif",
    fontSize: 16,
    fontWeight: 400,
    border: "none",
    cursor: "pointer",
    backgroundColor: "transparent",
    padding: 0,
    outline: "none",
    flex: 1,
    order: 0,
  },
  variants: {
    hasStaticLeftSlot: {
      true: {
        paddingLeft: 28,
      },
    },
    hasStaticRightSlot: {
      true: {
        paddingRight: 28,
      },
    },
    hasLabel: {
      true: {
        height: "100%",
        overflow: "hidden",
        selectors: {
          "&::placeholder": {
            color: "transparent",
            transition: "color 0.2s",
          },
          "&:focus::placeholder": {
            color: theme.colors.palette.systemGrayLight,
          },
        },
      },
      false: {
        marginTop: 0,
        height: "100%",
        selectors: {
          "&::placeholder": {
            color: theme.colors.palette.systemGrayLight,
          },
        },
      },
    },
    isActive: {
      true: {
        color: theme.colors.text.textNegative,
      },
      false: {
        color: theme.colors.text.textSecondary,
      },
    },
    disabled: {
      true: {
        cursor: "not-allowed",
      },
    },
  },
  defaultVariants: {
    hasLabel: true,
    disabled: false,
    hasStaticLeftSlot: false,
    hasStaticRightSlot: false,
  },
});

export const controlStyle = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    width: "100%",
    position: "relative",
  },
  variants: {
    animate: {
      true: {
        transition: "margin-top 0.2s ease-in-out",
      },
      false: {
        transition: "none",
      },
    },
    hasStaticLeftSlot: {
      true: {
        paddingLeft: 28,
      },
    },
    hasStaticRightSlot: {
      true: {
        paddingRight: 28,
      },
    },
    active: {
      true: {},
      false: {
        marginTop: 0,
      },
    },
    hasLabel: {
      true: {
        height: "100%",
      },
      false: {
        height: "100%",
      },
    },
  },
  compoundVariants: [
    {
      variants: {
        active: true,
        hasLabel: true,
      },
      style: {
        marginTop: 22,
      },
    },
  ],
  defaultVariants: {
    active: false,
    hasLabel: true,
    animate: true,
    hasStaticLeftSlot: false,
    hasStaticRightSlot: false,
  },
});

export const slotStyle = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.colors.palette.systemGrayBase,
    minWidth: 20,
    minHeight: 20,
    selectors: {
      '&[data-floating=\"true\"]': {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
      },
      '&[data-floating=\"true\"][data-side=\"left\"]': {
        left: 18,
      },
      '&[data-floating=\"true\"][data-side=\"right\"]': {
        right: 18,
      },
      '&[data-floating=\"true\"][data-animated=\"true\"][data-active=\"true\"]': {
        transform: "translateY(calc(-50% + 22px))",
      },
    },
  },
});

const textInputStyles = recipe({
  base: container,
  variants: {
    disabled: {
      true: {
        opacity: 0.5,
        cursor: "not-allowed",
      },
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

export default textInputStyles;
