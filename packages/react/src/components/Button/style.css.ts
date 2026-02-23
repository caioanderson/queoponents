import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/index.css";
import { recipe } from "@vanilla-extract/recipes";

const baseButtonStyle = style({
  padding: 10,
  border: "none",
  borderRadius: 999,
  cursor: "pointer",
  transition: "filter 0.3s ease",
  ":hover": {
    filter: "brightness(0.9)",
  },
});

const buttonStyle = recipe({
  base: baseButtonStyle,
  variants: {
    variant: {
      primary: {
        backgroundColor: vars.colors.palette.systemBlueBase,
        color: "white",
      },
      secondary: {
        // backgroundColor: vars.color.black,
        color: "white",
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
        cursor: "not-allowed",
        ":hover": {
          filter: "none",
        },
      },
    },
  },
  defaultVariants: {
    variant: "primary",
    disabled: false,
  },
});

export default buttonStyle;
