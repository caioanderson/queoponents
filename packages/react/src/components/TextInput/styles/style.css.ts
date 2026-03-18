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
    color: theme.colors.palette.gray.base,
    position: "absolute",
    left: 18,
    right: 18,
    transition: "all 0.2s ease-in-out",
    pointerEvents: "none",
    zIndex: 1,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
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
        left: 44,
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
    zIndex: 1,
    transition: "transform 0.2s ease-in-out",
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
            color: theme.colors.palette.gray.light,
          },
        },
      },
      false: {
        marginTop: 0,
        height: "100%",
        transition: "none",
        selectors: {
          "&::placeholder": {
            color: theme.colors.palette.gray.light,
          },
        },
      },
    },
    isActive: {
      true: {
        color: theme.colors.text.negative,
        transform: "translateY(12px)",
      },
      false: {
        color: theme.colors.text.secondary,
        transform: "translateY(0)",
      },
    },
    disabled: {
      true: {
        cursor: "not-allowed",
      },
    },
  },
  compoundVariants: [
    {
      variants: {
        hasLabel: false,
        isActive: true,
      },
      style: {
        transform: "translateY(0)",
      },
    },
  ],
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
  defaultVariants: {
    active: false,
    hasLabel: true,
    animate: true,
  },
});

export const slotStyle = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.colors.palette.gray.base,
    minWidth: 20,
    minHeight: 20,
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 2,
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
